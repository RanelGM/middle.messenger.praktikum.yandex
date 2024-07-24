import { Block } from "shared/constructors";
import { Button } from "shared/ui";
import { ChatCreateModalWithStore } from "../chat-create-modal/chat-create-modal";
import type { BlockProps } from "shared/constructors";
import styles from "./chat-create.module.scss";

type InnerProps = {
  isModalOpen: boolean;
};

export class ChatCreate extends Block {
  toggleModal: (isModalOpen: boolean) => void;

  constructor() {
    const toggleModal = (isModalOpen: boolean) => {
      this.setProps({ isModalOpen });
    };

    super({
      isModalOpen: false,
      CreateButton: new Button({
        text: "+ Новый чат",
        variant: "clear",
        size: "small",
        className: styles.createButton,
        onClick: () => {
          this.toggleModal(true);
        },
      }),
      CreateModal: new ChatCreateModalWithStore({ toggleModal }),
    });

    this.toggleModal = toggleModal;
  }

  componentDidUpdate(oldProps: BlockProps & InnerProps, newProps: BlockProps & InnerProps): boolean {
    if (oldProps.isModalOpen !== newProps.isModalOpen) {
      this.toggleModal(newProps.isModalOpen);
    }

    return true;
  }

  render(): string {
    return /* HTML */ ` <div>{{{ CreateButton }}} {{#if isModalOpen}} {{{ CreateModal }}} {{/if}}</div> `;
  }
}
