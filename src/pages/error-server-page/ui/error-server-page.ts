import { connect } from "entities/store";
import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { LinkAsButton, PageTitle } from "shared/ui";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";
import styles from "./error-server-page.module.scss";

type MapProps = {
  isAuthorized: boolean;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    isAuthorized: Boolean(state.userReducer.user?.data),
  };
};

class ErrorServerPage extends Block {
  constructor() {
    super({
      isAuthorized: false,
      PageTitle: new PageTitle({ text: "Ошибка сервера" }),
      LinkAsButton: new LinkAsButton({
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

    return true;
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">
          <div class="${styles.titleWrapper}">
            <p class="${styles.titleNumber}">500</p>
            {{{ PageTitle }}}
          </div>

          {{#if isAuthorized}} {{{ LinkAsButton }}} {{/if}}
        </div>
      </main>
    `;
  }
}

export const ErrorServerPageWithStore = connect(mapStateToProps, ErrorServerPage);
