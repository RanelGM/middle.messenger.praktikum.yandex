import { chatApi } from "entities/chat";
import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { isEqual } from "shared/lib";
import { Button, Icon } from "shared/ui";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";

type ChatRemoveModalProps = {
  isOpen: boolean;
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
  constructor(props: ChatRemoveModalProps) {
    const { isOpen } = props;

    super({
      isOpen,
      ButtonClose: new Button({
        text: "",
        size: "small",
        variant: "clear",
        Icon: new Icon({ name: "Cross", size: "small" }),
        className: "modalButtonClose",
        onClick: () => {
          this.handleClose();
        },
      }),
      ButtonSubmit: new Button({
        text: "Удалить",
        onClick: () => {
          this.handleSubmit();
        },
      }),
    });
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

  private handleClose() {
    this.setProps({ isOpen: false });
  }

  private handleSubmit() {
    const activeChat = (this.props as MapProps).activeChat;

    if (activeChat) {
      void chatApi.removeChat(activeChat, this.handleClose.bind(this));
    }
  }

  render(): string {
    return /* HTML */ `
      <div class="modal {{#unless isOpen}}visually-hidden{{/unless}}">
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
