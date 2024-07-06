import { Block } from "shared/constructors";
import { IconButton, Input } from "shared/ui";
import type { BasicInputEvent } from "shared/ui";
import styles from "./chat-message-form.module.scss";

export class ChatMessageForm extends Block {
  constructor() {
    super({
      ButtonClip: new IconButton({ name: "Clip" }),
      Input: new Input({
        name: "message",
        classNameWrapper: styles.inputWrapper,
        onBlur: (evt) => {
          this._handleInputBlur(evt);
        },
      }),
      ButtonSend: new IconButton({
        name: "ArrowCircle",
        className: styles.buttonSend,
        onClick: () => {
          this._handleSendButtonClick();
        },
      }),
    });
  }

  _validate(value: string) {
    if (!value) {
      this.children.Input?.setProps({ errorMessage: "Значение обязательно" });

      return false;
    }

    this.children.Input?.setProps({ errorMessage: "" });

    return true;
  }

  _handleInputBlur(evt: BasicInputEvent<FocusEvent>) {
    const value = evt.target.value;

    this.setProps({ message: value });
    this._validate(value);
  }

  _handleSendButtonClick() {
    const message = (this.props.message as string | undefined) ?? "";
    const isFormValid = this._validate(message);

    const formData = { message };
    const validationMessage = `Форма ${isFormValid ? "прошла" : "не прошла"} валидацию`;

    console.group("Форма");
    console.log(validationMessage);
    console.log(`Текущие данные:`, formData);
    console.groupEnd();

    alert(`${validationMessage} ${JSON.stringify(formData, null, 2)}`);
  }

  render() {
    return /* HTML */ `
      <form class="${styles.chatMessageForm}">{{{ ButtonClip }}} {{{ Input }}} {{{ ButtonSend }}}</form>
    `;
  }
}
