import { Block } from "shared/constructors";
import { Input } from "shared/ui";
import styles from "./search.module.scss";

export class Search extends Block {
  constructor() {
    super({
      Input: new Input({ name: "search", classNameInput: styles.input }),
    });
  }

  render() {
    return /* HTML */ ` <form>{{{ Input }}}</form> `;
  }
}
