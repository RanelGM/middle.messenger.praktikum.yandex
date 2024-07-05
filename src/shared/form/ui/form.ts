import { Block } from "shared/constructors";
import { Button, Input } from "shared/ui";
import type { ValidationResult } from "shared/types";
import type { BasicInputEvent, InputProps } from "shared/ui";
import styles from "./form.module.scss";

type FormInput = Omit<InputProps, "onBlur" | "onChange" | "onFocus" | "name"> & {
  name: string;
  validate?: (value: string, repeatFor?: string) => ValidationResult;
  repeatForName?: string;
  repeatByName?: string;
};

type Props = {
  inputs: FormInput[];
  submitText: string;
  className?: string;
  onSubmit?: (formData: Record<string, string>) => void;
};

export class Form extends Block {
  inputsMap: Record<string, FormInput> = {};
  inputsIndexMap: Record<string, number> = {};

  constructor(props: Props) {
    const { inputs, submitText, ...restProps } = props;

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
      SubmitButton: new Button({
        text: submitText,
        variant: "blue",
        type: "button",
        onClick: () => {
          this._handleSubmitButtonClick();
        },
      }),
    });

    inputs.forEach((inputProps, index) => {
      this.inputsMap[inputProps.name] = inputProps;
      this.inputsIndexMap[inputProps.name] = index;
    });
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

  _handleSubmitButtonClick() {
    const formData: Record<string, string> = {};
    let isFormValid = true;

    Object.keys(this.inputsMap).forEach((inputName) => {
      const value = (this.props[inputName] as string | undefined) ?? "";
      const isValid = this._validate(value, inputName);

      formData[inputName] = value;

      if (!isValid) {
        isFormValid = false;
      }
    });

    const validationMessage = `Форма ${(isFormValid as boolean) ? "прошла" : "не прошла"} валидацию`;

    console.group("Форма");
    console.log(validationMessage);
    console.log(`Текущие данные:`, formData);
    console.groupEnd();

    // eslint-disable-next-line no-alert
    alert(`${validationMessage} ${JSON.stringify(formData, null, 2)}`);
  }

  _handleInputBlur(evt: BasicInputEvent<FocusEvent>, inputName: string) {
    this.setProps({ [inputName]: evt.target.value });
    this._validate(evt.target.value, inputName);
  }

  render(): string {
    return /* HTML */ `
      <form class="${styles.form} {{#if value}}{{ className }}{{/if}}">
        <div class="${styles.inputsWrapper}">{{{ lists }}}</div>
        {{{ SubmitButton }}}
      </form>
    `;
  }
}
