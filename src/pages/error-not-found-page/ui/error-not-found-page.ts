import { Block } from "shared/constructors";
import { LinkAsButton, PageTitle } from "shared/ui";
import styles from "./error-not-found-page.module.scss";

export class ErrorNotFoundPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Страница не найдена" }),
      LinkAsButton: new LinkAsButton({ text: "Назад к чатам", href: "/chat", variant: "white", page: "chat" }),
    });
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">
          <div class="${styles.titleWrapper}">
            <p class="${styles.titleNumber}">404</p>
            {{{ PageTitle }}}
          </div>

          {{{ LinkAsButton }}}
        </div>
      </main>
    `;
  }
}
