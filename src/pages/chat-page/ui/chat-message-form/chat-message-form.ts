import { chatWs } from "entities/chat";
import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { isEqual } from "shared/lib";
import { IconButton, Input } from "shared/ui";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";
import type { BasicInputEvent } from "shared/ui";
import styles from "./chat-message-form.module.scss";

type MapProps = {
  activeChat: Chat | null;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    activeChat: state.chatReducer.activeChat,
  };
};

class ChatMessageForm extends Block {
  activeChat: Chat | null;
  inputValue = "";

  constructor() {
    super({
      handleSubmit: (evt: SubmitEvent) => {
        evt.preventDefault();
      },
      Input: new Input({
        name: "message",
        value: "",
        placeholder: "Введите текст",
        classNameWrapper: styles.inputWrapper,
        onInput: (evt) => {
          this.handleInputChange(evt);
        },
      }),
      ButtonSend: new IconButton({
        name: "ArrowCircle",
        className: styles.buttonSend,
        onClick: () => {
          this.handleSendButtonClick();
        },
      }),
      events: {
        submit: (evt: SubmitEvent) => {
          this.handleFormSubmit(evt);
        },
      },
    });

    this.activeChat = null;
  }

  private resetInput() {
    this.inputValue = "";
    (this.children.Input as Input | undefined)?.resetValue();
  }

  private validate(value: string) {
    if (!value) {
      this.children.Input?.setProps({ errorMessage: "Значение обязательно" });

      return false;
    }

    this.children.Input?.setProps({ errorMessage: "" });

    return true;
  }

  private handleInputChange(evt: BasicInputEvent<Event>) {
    this.inputValue = evt.target.value;
  }

  private handleSendButtonClick() {
    const message = this.inputValue;
    const isFormValid = this.validate(message);

    if (!this.activeChat || !isFormValid) {
      return;
    }

    this.resetInput();

    const socket = chatWs.getSocket(this.activeChat.id);
    socket?.send({ type: "message", content: message });
  }

  private handleFormSubmit(evt: SubmitEvent) {
    evt.preventDefault();
    this.handleSendButtonClick();
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    const hasChanges = !isEqual(oldProps.activeChat ?? {}, newProps.activeChat ?? {});

    if (hasChanges) {
      this.resetInput();
      this.activeChat = newProps.activeChat;
    }

    return hasChanges;
  }

  render() {
    return /* HTML */ ` <form class="${styles.chatMessageForm}">{{{ Input }}} {{{ ButtonSend }}}</form> `;
  }
}

export const ChatMessageFormWithStore = connect(mapStateToProps, ChatMessageForm);
