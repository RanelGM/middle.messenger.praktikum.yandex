import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { LinkAsButton, PageTitle } from "shared/ui";
import styles from "./error-not-found-page.module.scss";

export class ErrorNotFoundPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Страница не найдена" }),
      LinkAsButton: new LinkAsButton({
        href: AppRoutes.Chat,
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
            <p class="${styles.titleNumber}">404</p>
            {{{ PageTitle }}}
          </div>

          {{{ LinkAsButton }}}
        </div>
      </main>
    `;
  }
}
