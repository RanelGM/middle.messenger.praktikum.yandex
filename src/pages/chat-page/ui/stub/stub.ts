import { Block } from "shared/constructors";
import styles from "./stub.module.scss";

export class Stub extends Block {
  constructor() {
    super({});
  }

  render() {
    return /* HTML */ `<div class="${styles.stub}">Выберите чат чтобы отправить сообщение</div>`;
  }
}
