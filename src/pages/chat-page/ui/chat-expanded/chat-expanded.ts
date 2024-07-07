import { Block } from "shared/constructors";
import { ChatMessage } from "../chat-message/chat-message";
import { getMessageMock } from "../chat-message/getMessageMock";
import { ChatMessageForm } from "../chat-message-form/chat-message-form";
import { UserControls } from "../user-controls/user-controls";
import type { ChatItemType } from "pages/chat-page/model/types";
import type { BlockProps } from "shared/constructors";
import styles from "./chat-expanded.module.scss";

type Props = {
  chatItem: ChatItemType | null;
};

const messagesMock = Array.from({ length: 10 }, (_value, index) => getMessageMock(index));

export class ChatExpanded extends Block {
  constructor(props: Props) {
    const { chatItem } = props;

    const lists = messagesMock.map((message) => {
      return new ChatMessage({ message });
    });

    super({
      UserControls: new UserControls({ chatItem }),
      SendForm: new ChatMessageForm(),
      lists,
    });
  }

  componentDidUpdate(_oldProps: BlockProps, newProps: BlockProps) {
    (this.children.UserControls as UserControls).setProps({ chatItem: newProps.chatItem });

    return true;
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
