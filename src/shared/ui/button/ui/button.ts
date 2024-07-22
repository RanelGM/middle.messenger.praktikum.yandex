import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import { DefaultButtonSize, DefaultButtonType, DefaultColorVariant } from "../model/constants";
import type { ButtonSize, ButtonType, ColorVariant } from "../model/types";
import styles from "./button.module.scss";

type Props = {
  text?: string;
  variant?: ColorVariant;
  size?: ButtonSize;
  type?: ButtonType;
  className?: string;
  isLoading?: boolean;
  onClick: () => void;
};

export class Button extends Block {
  constructor(props: Props) {
    const {
      variant = DefaultColorVariant,
      size = DefaultButtonSize,
      type = DefaultButtonType,
      className,

      onClick,
      ...restProps
    } = props;

    super({
      ...restProps,
      type,
      className: cn(styles.button, styles[`button_variant-${variant}`], styles[`button_size-${size}`], className),
      events: {
        click: onClick,
      },
    });
  }

  override render() {
    return /* HTML */ `
      <button type="{{ type }}" class="{{ className }}">
        {{#if isLoading }} Загружаем... {{ else }} {{ text }} {{/if}}
      </button>
    `;
  }
}
