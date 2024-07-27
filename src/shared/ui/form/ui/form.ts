import { Block } from "shared/constructors";
import { deepClone, isEqual } from "shared/lib";
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
  values?: Record<string, string>;
  onSubmit: (submitData: SubmitData) => void;
};

export class Form<SubmitData extends Record<string, string>> extends Block {
  inputsMap: Record<string, FormInput> = {};
  inputsIndexMap: Record<string, number> = {};

  constructor(props: Props<SubmitData>) {
    const { inputs, submitText, isLoading, onSubmit, values = {}, ...restProps } = props;

    const lists = inputs.map((inputProps) => {
      return new Input({
        ...inputProps,
        onBlur: (evt) => {
          this.handleInputBlur(evt, inputProps.name);
        },
      });
    });

    super({
      ...restProps,
      values,
      lists,
      submitText,
      SubmitButton: new Button({
        text: submitText,
        variant: "blue",
        type: "button",
        isLoading,
        onClick: () => {
          this.handleSubmitButtonClick(onSubmit);
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

    if (!isEqual(oldProps.values ?? {}, newProps.values ?? {})) {
      this.updateValues(newProps.values ?? {});
    }

    return true;
  }

  private getValues = (): Record<string, string> => {
    return (this.props.values as Record<string, string>) ?? {};
  };

  private getValue = (key: string): string => {
    return this.getValues()[key] ?? "";
  };

  private updateValues(values: Record<string, string>) {
    const inputsMap = deepClone(this.inputsMap);

    Object.entries(values).forEach(([key, value]) => {
      if (!this.inputsMap[key] || this.inputsIndexMap[key] === undefined) {
        return;
      }

      const lists = deepClone(this.lists.lists) ?? [];
      const block = lists[this.inputsIndexMap[key] as number];

      if (block) {
        block.setProps({ value });
        inputsMap[key] = { ...this.inputsMap[key], value } as FormInput;
      }
    });

    this.inputsMap = inputsMap;
    this.setProps({ inputsMap });
  }

  private updateErrorMessage(inputName: string, errorMessage: string) {
    const index = this.inputsIndexMap[inputName];

    if (index !== undefined && this.lists.lists?.[index]) {
      (this.lists.lists[index] as Block).props.errorMessage = errorMessage;
    }
  }

  private validateRepeatFor(value: string, inputName: string) {
    const { validate, repeatForName } = this.inputsMap[inputName] ?? {};

    if (!validate || !repeatForName) {
      return true;
    }

    const byValue = value;
    const forValue = this.getValue(repeatForName);

    const { isValid, errorMessage } = validate(byValue, forValue);

    this.updateErrorMessage(inputName, errorMessage);

    return isValid;
  }

  private validate(value: string, inputName: string): boolean {
    const { validate, repeatForName } = this.inputsMap[inputName] ?? {};

    if (!validate) {
      return true;
    }

    if (repeatForName) {
      return this.validateRepeatFor(value, inputName);
    }

    const { isValid, errorMessage } = validate(value);

    this.updateErrorMessage(inputName, errorMessage);

    return isValid;
  }

  private handleSubmitButtonClick(onSubmit: (submitData: SubmitData) => void) {
    const submitData: Record<string, string> = {};
    let isFormValid = true;

    Object.keys(this.inputsMap).forEach((inputName) => {
      const value = this.getValue(inputName);
      const isValid = this.validate(value, inputName);

      submitData[inputName] = value;

      if (!isValid) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      onSubmit(submitData as SubmitData);
    }
  }

  private handleInputBlur(evt: BasicInputEvent<FocusEvent>, inputName: string) {
    const values = { ...this.getValues(), [inputName]: evt.target.value };
    this.setProps({ values });
    this.validate(evt.target.value, inputName);
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
