import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { ChatMessage } from "../chat-message/chat-message";
import { getMessageMock } from "../chat-message/getMessageMock";
import { ChatMessageForm } from "../chat-message-form/chat-message-form";
import { UserControlsWithStore } from "../user-controls/user-controls";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import styles from "./chat-expanded.module.scss";

type Props = {
  chat: Chat | null;
};

type MapProps = {
  activeChat: Chat | null;
};

const messagesMock = Array.from({ length: 10 }, (_value, index) => getMessageMock(index));

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    activeChat: state.chatReducer.activeChat,
  };
};

class ChatExpanded extends Block {
  constructor(props: Props) {
    const { chat } = props;

    const lists = messagesMock.map((message) => {
      return new ChatMessage({ message });
    });

    super({
      UserControls: new UserControlsWithStore({ chat }),
      SendForm: new ChatMessageForm(),
      lists,
    });
  }

  render() {
    return /* HTML */ `
      <div class="${styles.chatExpanded}">
        {{{ UserControls }}}

        <div class="${styles.messagesWrapper}">{{{ lists }}}</div>

        {{{ SendForm }}}
      </div>
    `;
  }
}

export const ChatExpandedWithStore = connect(mapStateToProps, ChatExpanded);
