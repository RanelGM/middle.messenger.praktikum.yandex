import { Block } from "shared/constructors";

export type InputType = "text" | "email" | "password" | "tel" | "file";

export type BasicInputEvent<T> = Omit<T, "target"> & { target: HTMLInputElement };

export type InputBasicProps = {
  value?: string;
  type?: InputType;
  name?: string;
  accept?: string;
  required?: boolean;
  disabled?: boolean;
  classNameInput?: string;
  onChange?: (evt: BasicInputEvent<Event>) => void;
  onFocus?: (evt: BasicInputEvent<FocusEvent>) => void;
  onBlur?: (evt: BasicInputEvent<FocusEvent>) => void;
};

export class InputBasic extends Block {
  constructor(props: InputBasicProps) {
    const { onChange, onFocus, onBlur, ...restProps } = props;

    super({
      ...restProps,
      events: {
        change: onChange,
        focus: onFocus,
        blur: onBlur,
      },
    });
  }

  override render() {
    return /* HTML */ `
      <input
        class="{{ classNameInput }}"
        name="{{ name }}"
        type="{{ type }}"
        {{#if accept}} accept="{{ accept }}"{{/if}}
        value="{{#if value}}{{ value }}{{/if}}"
        {{#if disabled}}disabled{{/if}}
        {{#if required}}required{{/if}}
      />
    `;
  }
}
