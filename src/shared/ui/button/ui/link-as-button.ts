import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import { DefaultButtonSize, DefaultColorVariant } from "../model/constants";
import type { ButtonSize, ColorVariant } from "../model/types";
import styles from "./button.module.scss";

type Props = {
  href?: string;
  page: string;
  text?: string;
  variant?: ColorVariant;
  size?: ButtonSize;
  className?: string;
};

export class LinkAsButton extends Block {
  constructor(props: Props) {
    const { variant = DefaultColorVariant, size = DefaultButtonSize, className, ...restProps } = props;

    super({
      ...restProps,
      className: cn(
        styles.linkAsButton,
        styles[`linkAsButton_variant-${variant}`],
        styles[`linkAsButton_size-${size}`],
        className,
      ),
    });
  }

  override render() {
    return /* HTML */ `<a href="{{ href }}" page="{{ page }}" class="{{ className }}">{{ text }}</a>`;
  }
}
