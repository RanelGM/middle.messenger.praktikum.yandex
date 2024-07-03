import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import { Input } from "shared/ui";
import type { InputProps } from "shared/ui";
import styles from "./profile-input.module.scss";

type Props = InputProps;

export class ProfileInput extends Block {
  constructor(props: Props) {
    const { classNameWrapper, classNameLabel, classNameLabelText, classNameInput, ...restProps } = props;

    super({
      Input: new Input({
        ...restProps,
        classNameWrapper: cn(styles.wrapper, classNameWrapper),
        classNameLabel: cn(styles.label, classNameLabel),
        classNameLabelText: cn(styles.labelText, classNameLabelText),
        classNameInput: cn(styles.input, "text-dots", classNameInput),
      }),
    });
  }

  override render() {
    return /* HTML */ `{{{ Input }}}`;
  }
}
