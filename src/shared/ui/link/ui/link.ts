import { Block, router } from "shared/constructors";
import { cn } from "shared/lib";
import type { Icon } from "../../icons";
import styles from "./link.module.scss";

type Props = {
  text: string;
  href: string;
  className?: string;
  IconLeft?: Icon;
  IconRight?: Icon;
};

export class Link extends Block {
  constructor(props: Props) {
    const { text, href, className, IconLeft, IconRight } = props;

    super({
      text,
      href,
      IconLeft,
      IconRight,
      className: cn(styles.link, className),
      events: {
        click: (evt: MouseEvent) => {
          evt.preventDefault();
          router.go(href);
        },
      },
    });
  }

  override render() {
    return /* HTML */ `
      <a href="{{ href }}" page="{{ page }}" class="{{ className }}"> {{{ Icon }}} {{ text }} {{{ IconRight }}}</a>
    `;
  }
}
