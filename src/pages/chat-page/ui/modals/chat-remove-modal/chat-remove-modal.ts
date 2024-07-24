import { chatApi } from "entities/chat";
import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { isEqual } from "shared/lib";
import { Button, Icon } from "shared/ui";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";

type ChatRemoveModalProps = {
  closeModal: () => void;
};

type MapProps = {
  isLoading: boolean;
  activeChat: Chat | null;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    isLoading: state.chatReducer.chats.isLoading,
    activeChat: state.chatReducer.activeChat,
  };
};

class ChatRemoveModal extends Block {
  closeModal: () => void;

  constructor(props: ChatRemoveModalProps) {
    const { closeModal } = props;

    super({
      ButtonClose: new Button({
        text: "",
        size: "small",
        variant: "clear",
        Icon: new Icon({ name: "Cross", size: "small" }),
        className: "modalButtonClose",
        onClick: closeModal,
      }),
      ButtonSubmit: new Button({
        text: "Удалить",
        onClick: () => {
          this.handleSubmit();
        },
      }),
    });

    this.closeModal = closeModal;
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!isEqual(oldProps.activeChat ?? {}, newProps.activeChat ?? {})) {
      this.setProps({ activeChat: newProps.activeChat });
    }

    if (oldProps.isLoading !== newProps.isLoading) {
      this.children.ButtonSubmit?.setProps({ isLoading: newProps.isLoading });
    }

    return true;
  }

  handleSubmit() {
    const activeChat = (this.props as MapProps).activeChat;

    if (activeChat) {
      void chatApi.removeChat(activeChat, this.closeModal);
    }
  }

  render(): string {
    return /* HTML */ `
      <div class="modal">
        <div class="modalContent">
          {{{ ButtonClose }}}
          <h2 class="modalTitle">Вы уверены, что хотите удалить чат {{ chat.title }}?</h2>
          {{{ Input }}} {{{ ButtonSubmit }}}
        </div>
      </div>
    `;
  }
}

export const ChatRemoveModalWithStore = connect(mapStateToProps, ChatRemoveModal);
