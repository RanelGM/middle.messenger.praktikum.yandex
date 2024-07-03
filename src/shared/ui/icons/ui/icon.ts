import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import { IconsMap } from "./icons-map";
import styles from "./icon.module.scss";

type IconSize = "small" | "medium";

type Props = {
  name: keyof typeof IconsMap;
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
