import { Block, router } from "shared/constructors";
import { cn } from "shared/lib";
import { DefaultButtonSize, DefaultColorVariant } from "../model/constants";
import type { Icon } from "../../icons";
import type { ButtonSize, ColorVariant } from "../model/types";
import styles from "./button.module.scss";

type Props = {
  href: string;
  text?: string;
  variant?: ColorVariant;
  size?: ButtonSize;
  className?: string;
  Icon?: Icon;
  isLoading?: boolean;
};

export class LinkAsButton extends Block {
  constructor(props: Props) {
    const { href, variant = DefaultColorVariant, size = DefaultButtonSize, className, ...restProps } = props;

    super({
      ...restProps,
      href,
      className: cn(
        styles.linkAsButton,
        styles[`linkAsButton_variant-${variant}`],
        styles[`linkAsButton_size-${size}`],
        className,
      ),
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
      <a href="{{ href }}" page="{{ page }}" class="{{ className }}">
        {{{ Icon }}} {{#if isLoading }} Загружаем... {{ else }} {{ text }} {{/if}}
      </a>
    `;
  }
}
