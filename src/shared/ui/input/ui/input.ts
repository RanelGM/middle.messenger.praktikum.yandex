import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import { InputBasic } from "./input-basic/input-basic";
import type { InputBasicProps } from "./input-basic/input-basic";
import type { BlockProps } from "shared/constructors";
import styles from "./input.module.scss";

export type InputProps = InputBasicProps & {
  classNameWrapper?: string;
  classNameLabel?: string;
  classNameLabelText?: string;
  labelText?: string;
  errorMessage?: string;
};

export class Input extends Block {
  constructor(props: InputProps) {
    const { errorMessage, classNameWrapper, classNameLabel, classNameLabelText, classNameInput, ...restProps } = props;

    super({
      ...restProps,
      InputBasic: new InputBasic({
        ...restProps,
        classNameInput: cn(styles.input, errorMessage && styles.input_error, classNameInput),
      }),
      errorMessage,
      classNameWrapper: cn(styles.inputWrapper, classNameWrapper),
      classNameLabel: cn(styles.label, classNameLabel),
      classNameLabelText: cn(styles.labelText, errorMessage && styles.labelText_error, classNameLabelText),
    });
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (oldProps.value !== newProps.value) {
      this.children.InputBasic?.setProps({ value: newProps.value });
    }

    return true;
  }

  public resetValue() {
    this.children.InputBasic?.setProps({ value: "", errorMessage: "" });
  }

  override render() {
    return /* HTML */ `
      <div class="{{ classNameWrapper }}">
        <label class="{{ classNameLabel }}">
          {{#if labelText}}
          <span class="{{ classNameLabelText }}">{{ labelText }}</span>
          {{/if}} {{{ InputBasic }}}
        </label>

        {{#if errorMessage}}
        <p class="${styles.errorMessage}">{{ errorMessage }}</p>
        {{/if}}
      </div>
    `;
  }
}
