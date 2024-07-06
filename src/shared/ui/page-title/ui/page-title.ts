import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import styles from "./page-title.module.scss";

type Props = {
  text?: string;
  className?: string;
};

export class PageTitle extends Block {
  constructor(props: Props) {
    const { className, ...restProps } = props;

    super({
      ...restProps,
      className: cn(styles.pageTitle, className),
    });
  }

  override render() {
    return /* HTML */ `<h1 class="{{ className }}">{{ text }}</h1>`;
  }
}
