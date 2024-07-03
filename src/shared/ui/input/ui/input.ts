import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import styles from "./input.module.scss";

type InputType = "text" | "email" | "password" | "tel";

export type InputProps = {
  value?: string;
  type?: InputType;
  name?: string;
  labelText?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  classNameWrapper?: string;
  classNameLabel?: string;
  classNameLabelText?: string;
  classNameInput?: string;
};

export class Input extends Block {
  constructor(props: InputProps) {
    const { errorMessage, classNameWrapper, classNameLabel, classNameLabelText, classNameInput, ...restProps } = props;

    super({
      ...restProps,
      errorMessage,
      classNameWrapper: cn(styles.inputWrapper, classNameWrapper),
      classNameLabel: cn(styles.label, classNameLabel),
      classNameLabelText: cn(styles.labelText, errorMessage && styles.labelText_error, classNameLabelText),
      classNameInput: cn(styles.input, errorMessage && styles.input_error, classNameInput),
    });
  }

  override render() {
    return /* HTML */ `
      <div class="{{ classNameWrapper }}">
        <label class="{{ classNameLabel }}">
          {{#if labelText}}
          <span class="{{ classNameLabelText }}">{{ labelText }}</span>
          {{/if}}

          <input
            class="{{ classNameInput }}"
            name="{{ name }}"
            type="{{ type }}"
            value="{{#if value}}{{ value }}{{/if}}"
            {{#if disabled}}disabled{{/if}}
            {{#if required}}required{{/if}}
          />
        </label>

        {{#if errorMessage}}
        <p class="${styles.errorMessage}">{{ errorMessage }}</p>
        {{/if}}
      </div>
    `;
  }
}
