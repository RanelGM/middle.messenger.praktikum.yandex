import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import { Icon } from "shared/ui/icons";
import type { IconName, IconSize } from "shared/ui/icons";
import styles from "./icon-button.module.scss";

type Props = {
  name: IconName;
  size?: IconSize;
  className?: string;
  iconClassName?: string;
  hasBackground?: boolean;
  onClick?: () => void;
};

export class IconButton extends Block {
  constructor(props: Props) {
    const { hasBackground, className, iconClassName, onClick, ...iconProps } = props;

    super({
      className: cn(styles.iconButton, hasBackground ? styles.iconButton_background : "", className),
      Icon: new Icon({ ...iconProps, className: iconClassName }),
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return /* HTML */ ` <button class="{{className}}" type="button">{{{ Icon }}}</button> `;
  }
}
