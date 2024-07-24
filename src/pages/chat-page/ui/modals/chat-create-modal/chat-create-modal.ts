import { chatApi } from "entities/chat";
import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { Button, Icon, Input } from "shared/ui";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";
import type { BasicInputEvent } from "shared/ui";

type ChatCreateModalProps = {
  toggleModal: (isOpen: boolean) => void;
};

type MapProps = {
  isLoading: boolean;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    isLoading: state.chatReducer.chats.isLoading,
  };
};

class ChatCreateModal extends Block {
  inputValue = "";
  closeModal: () => void;

  constructor(props: ChatCreateModalProps) {
    const { toggleModal } = props;

    const closeModal = () => {
      toggleModal(false);
    };

    super({
      ButtonClose: new Button({
        text: "",
        size: "small",
        variant: "clear",
        Icon: new Icon({ name: "Cross", size: "small" }),
        className: "modalButtonClose",
        onClick: closeModal,
      }),
      Input: new Input({
        placeholder: "Введите название",
        onInput: (evt) => {
          this.handleInputChange(evt);
        },
      }),
      ButtonSubmit: new Button({
        text: "Создать",
        onClick: () => {
          this.handleSubmit();
        },
      }),
    });

    this.closeModal = closeModal;
  }

  private handleInputChange(evt: BasicInputEvent<Event>) {
    this.inputValue = evt.target.value;
  }

  private handleSubmit() {
    const value = this.inputValue.trim();

    this.children.Input?.setProps({ errorMessage: value ? "" : "Обязательно к заполнению" });

    if (value) {
      void chatApi.createChat(value, this.closeModal);
    }
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (oldProps.isLoading !== newProps.isLoading) {
      this.children.ButtonSubmit?.setProps({ isLoading: newProps.isLoading });
    }

    return true;
  }

  render(): string {
    return /* HTML */ `
      <div class="modal">
        <div class="modalContent">
          {{{ ButtonClose }}}
          <h2 class="modalTitle">Создать новый чат</h2>
          {{{ Input }}} {{{ ButtonSubmit }}}
        </div>
      </div>
    `;
  }
}

export const ChatCreateModalWithStore = connect<MapProps>(mapStateToProps, ChatCreateModal);
