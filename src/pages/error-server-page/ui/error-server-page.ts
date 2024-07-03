import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { LinkAsButton, PageTitle } from "shared/ui";
import styles from "./error-server-page.module.scss";

export class ErrorServerPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Ошибка сервера" }),
      LinkAsButton: new LinkAsButton({
        href: AppRoutes.Chat,
        page: AppRoutes.Chat,
        text: "Назад к чатам",
        variant: "white",
      }),
    });
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">
          <div class="${styles.titleWrapper}">
            <p class="${styles.titleNumber}">500</p>
            {{{ PageTitle }}}
          </div>

          {{{ LinkAsButton }}}
        </div>
      </main>
    `;
  }
}
