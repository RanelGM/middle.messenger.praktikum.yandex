import { connect } from "entities/store";
import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { LinkAsButton, PageTitle } from "shared/ui";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";
import styles from "./error-not-found-page.module.scss";

type MapProps = {
  isAuthorized: boolean;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    isAuthorized: Boolean(state.userReducer.user?.data),
  };
};

class ErrorNotFoundPage extends Block {
  constructor() {
    super({
      isAuthorized: false,
      PageTitle: new PageTitle({ text: "Страница не найдена" }),
      SignInLink: new LinkAsButton({
        href: AppRoutes.SignIn,
        text: "Назад к авторизации",
        variant: "white",
      }),
      ChatLink: new LinkAsButton({
        href: AppRoutes.Chat,
        text: "Назад к чатам",
        variant: "white",
      }),
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (oldProps.isAuthorized !== newProps.isAuthorized) {
      this.setProps({ isAuthorized: newProps.isAuthorized });
    }

    if (newProps.isAuthorized) {
      this.children.SignInLink?.hide();
    } else {
      this.children.SignInLink?.show();
    }

    return true;
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">
          <div class="${styles.titleWrapper}">
            <p class="${styles.titleNumber}">404</p>
            {{{ PageTitle }}}
          </div>

          {{{ SignInLink }}} {{#if isAuthorized}} {{{ ChatLink }}} {{/if}}
        </div>
      </main>
    `;
  }
}

export const ErrorNotFoundPageWithStore = connect(mapStateToProps, ErrorNotFoundPage);
