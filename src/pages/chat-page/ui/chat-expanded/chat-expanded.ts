import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { isEqual } from "shared/lib";
import { ChatMessage } from "../chat-message/chat-message";
import { ChatMessageFormWithStore } from "../chat-message-form/chat-message-form";
import { UserControlsWithStore } from "../user-controls/user-controls";
import type { Chat } from "entities/chat";
import type { ChatMessage as ChatMessageType } from "entities/chat/model/types";
import type { StoreState } from "entities/store";
import type { User } from "entities/user";
import type { BlockProps } from "shared/constructors";
import styles from "./chat-expanded.module.scss";

type Props = {
  chat: Chat | null;
};

type MapProps = {
  currentUser: User | null;
  activeChat: Chat | null;
  messages: ChatMessageType[];
};

const mapStateToProps = (state: StoreState): MapProps => {
  const activeChat = state.chatReducer.activeChat;
  const messages = (activeChat && state.chatReducer.chatMessages[activeChat.id]) ?? [];

  return {
    currentUser: state.userReducer?.user?.data,
    activeChat,
    messages,
  };
};

class ChatExpanded extends Block {
  constructor(props: Props) {
    const { chat } = props;

    super({
      UserControls: new UserControlsWithStore({ chat }),
      ChatMessageForm: new ChatMessageFormWithStore(),
      lists: [],
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!isEqual(oldProps.messages ?? {}, newProps.messages ?? {})) {
      this.setLists({ lists: this.getItems(newProps.messages, newProps.currentUser) });
    }

    return true;
  }

  private getItems(messages: ChatMessageType[], currentUser: User | null): ChatMessage[] {
    return messages.map((message) => {
      const isMessageByUser = currentUser?.id === message.userId;

      return new ChatMessage({ message, isMessageByUser });
    });
  }

  render() {
    return /* HTML */ `
      <div class="${styles.chatExpanded}">
        {{{ UserControls }}}

        <div class="${styles.messagesWrapper}">{{{ lists }}}</div>

        {{{ ChatMessageForm }}}
      </div>
    `;
  }
}

export const ChatExpandedWithStore = connect(mapStateToProps, ChatExpanded);
