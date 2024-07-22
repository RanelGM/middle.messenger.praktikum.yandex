import { Block } from "shared/constructors";
import { Button } from "../../button";
import { Input } from "../../input";
import type { BlockProps } from "shared/constructors";
import type { ValidationResult } from "shared/types";
import type { BasicInputEvent, InputProps } from "shared/ui";
import styles from "./form.module.scss";

type FormInput = Omit<InputProps, "onBlur" | "onChange" | "onFocus" | "name"> & {
  name: string;
  validate?: (value: string, repeatFor?: string) => ValidationResult;
  repeatForName?: string;
  repeatByName?: string;
};

type Props<SubmitData> = {
  inputs: FormInput[];
  submitText?: string;
  className?: string;
  isLoading?: boolean;
  onSubmit: (submitData: SubmitData) => void;
};

export class Form<SubmitData extends Record<string, string>> extends Block {
  inputsMap: Record<string, FormInput> = {};
  inputsIndexMap: Record<string, number> = {};

  constructor(props: Props<SubmitData>) {
    const { inputs, submitText, isLoading, onSubmit, ...restProps } = props;

    const lists = inputs.map((inputProps) => {
      return new Input({
        ...inputProps,
        onBlur: (evt) => {
          this._handleInputBlur(evt, inputProps.name);
        },
      });
    });

    super({
      ...restProps,
      lists,
      submitText,
      SubmitButton: new Button({
        text: submitText,
        variant: "blue",
        type: "button",
        isLoading,
        onClick: () => {
          this._handleSubmitButtonClick(onSubmit);
        },
      }),
    });

    inputs.forEach((inputProps, index) => {
      this.inputsMap[inputProps.name] = inputProps;
      this.inputsIndexMap[inputProps.name] = index;

      if (inputProps.value) {
        this.props[inputProps.name] = inputProps.value;
      }
    });
  }

  componentDidUpdate(oldProps: BlockProps & Props<SubmitData>, newProps: BlockProps & Props<SubmitData>): boolean {
    if (oldProps.isLoading !== newProps.isLoading) {
      this.children.SubmitButton?.setProps({ isLoading: newProps.isLoading });
    }

    return true;
  }

  _updateErrorMessage(inputName: string, errorMessage: string) {
    const index = this.inputsIndexMap[inputName];

    if (index !== undefined && this.lists.lists?.[index]) {
      (this.lists.lists[index] as Block).props.errorMessage = errorMessage;
    }
  }

  _validateRepeatFor(value: string, inputName: string) {
    const { validate, repeatForName } = this.inputsMap[inputName] ?? {};

    if (!validate || !repeatForName) {
      return true;
    }

    const byValue = value;
    const forValue = (this.props[repeatForName] as string | undefined) ?? "";
    const { isValid, errorMessage } = validate(byValue, forValue);

    this._updateErrorMessage(inputName, errorMessage);

    return isValid;
  }

  _validate(value: string, inputName: string): boolean {
    const { validate, repeatForName } = this.inputsMap[inputName] ?? {};

    if (!validate) {
      return true;
    }

    if (repeatForName) {
      return this._validateRepeatFor(value, inputName);
    }

    const { isValid, errorMessage } = validate(value);

    this._updateErrorMessage(inputName, errorMessage);

    return isValid;
  }

  _handleSubmitButtonClick(onSubmit: (submitData: SubmitData) => void) {
    const submitData: Record<string, string> = {};
    let isFormValid = true;

    Object.keys(this.inputsMap).forEach((inputName) => {
      const value = (this.props[inputName] as string | undefined) ?? "";
      const isValid = this._validate(value, inputName);

      submitData[inputName] = value;

      if (!isValid) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      onSubmit(submitData as SubmitData);
    }
  }

  _handleInputBlur(evt: BasicInputEvent<FocusEvent>, inputName: string) {
    this.setProps({ [inputName]: evt.target.value });
    this._validate(evt.target.value, inputName);
  }

  render(): string {
    return /* HTML */ `
      <form class="${styles.form} {{#if className}}{{ className }}{{/if}}">
        <div class="${styles.inputsWrapper}">{{{ lists }}}</div>
        {{#if submitText}} {{{ SubmitButton }}} {{/if}}
      </form>
    `;
  }
}
