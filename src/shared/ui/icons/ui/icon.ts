import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import { IconsMap } from "./icons-map";
import type { IconName, IconSize } from "../model/types";
import styles from "./icon.module.scss";

type Props = {
  name: IconName;
  size?: IconSize;
  className?: string;
};

export class Icon extends Block {
  constructor(props: Props) {
    const { name, size, className } = props;
    const IconElement = IconsMap[name];

    super({
      IconElement,
      attr: {
        class: cn(styles.icon, styles[`icon_size-${size}`], className),
      },
    });
  }

  override render() {
    return /* HTML */ `{{{ IconElement }}}`;
  }
}
