import { Block } from "shared/constructors";
import { Form } from "shared/ui";
import { cn, validatePassword, validatePasswordRepeat } from "shared/lib";
import inputStyles from "../../profile-page.module.scss";

const inputsClassNames = {
  classNameWrapper: inputStyles.inputWrapper,
  classNameLabel: inputStyles.inputLabel,
  classNameLabelText: inputStyles.inputLabelText,
  classNameInput: cn(inputStyles.input, "text-dots"),
};

export class ProfileEditPasswordSubPage extends Block {
  constructor() {
    super({
      Form: new Form({
        inputs: [
          { labelText: "Старый пароль", name: "oldPassword", type: "password", value: "foobar", ...inputsClassNames },
          {
            labelText: "Новый пароль",
            name: "newPassword",
            type: "password",
            value: "foobarbaz",
            ...inputsClassNames,
            validate: validatePassword,
            repeatForName: "newPasswordConfirm",
          },
          {
            labelText: "Повторите новый пароль",
            name: "newPasswordConfirm",
            type: "password",
            value: "foobarbaz",
            ...inputsClassNames,
            validate: validatePasswordRepeat,
            repeatForName: "newPassword",
          },
        ],
        submitText: "Сохранить",
      }),
    });
  }

  override render() {
    return /* HTML */ `{{{ Form }}}`;
  }
}
