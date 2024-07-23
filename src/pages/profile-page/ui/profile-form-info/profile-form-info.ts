import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { cn, isEqual, validateEmail, validateLogin, validateName, validatePhone } from "shared/lib";
import { Form } from "shared/ui";
import type { User } from "entities/auth";
import type { StoreState } from "entities/store/model/types";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";
import styles from "./profile-form-info.module.scss";
import inputStyles from "../profile-page.module.scss";

type Props = {
  isReadonly: boolean;
};

type MapProps = {
  userApi: ApiState<User | null>;
};

type SubmitState = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
};

const inputsClassNames = {
  classNameWrapper: inputStyles.inputWrapper,
  classNameLabel: inputStyles.inputLabel,
  classNameLabelText: inputStyles.inputLabelText,
  classNameInput: cn(inputStyles.input, "text-dots"),
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    userApi: state.authReducer.user,
  };
};

class ProfileFormInfo extends Block {
  constructor(props: Props) {
    const { isReadonly } = props;

    super({
      Form: new Form<SubmitState>({
        inputs: [
          {
            labelText: "Почта",
            name: "email",
            type: "email",
            value: "",
            ...inputsClassNames,
            validate: validateEmail,
          },
          {
            labelText: "Логин",
            name: "login",
            type: "text",
            value: "",
            ...inputsClassNames,
            validate: validateLogin,
          },
          {
            labelText: "Имя",
            name: "firstName",
            type: "text",
            value: "",
            ...inputsClassNames,
            validate: validateName,
          },
          {
            labelText: "Фамилия",
            name: "secondName",
            type: "text",
            value: "",
            ...inputsClassNames,
            validate: validateName,
          },
          {
            labelText: "Имя в чате",
            name: "displayName",
            type: "text",
            value: "",
            ...inputsClassNames,
            validate: validateName,
          },
          {
            labelText: "Телефон",
            name: "phone",
            type: "tel",
            value: "",
            ...inputsClassNames,
            validate: validatePhone,
          },
        ],
        submitText: isReadonly ? undefined : "Сохранить",
        className: isReadonly ? styles.readonly : "",
        onSubmit: () => {
          //
        },
      }),
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!isEqual(oldProps.userApi?.data ?? {}, newProps.userApi?.data ?? {})) {
      this.children.Form?.setProps({ values: newProps.userApi?.data ?? {} });
    }

    return true;
  }

  override render() {
    return /* HTML */ ` {{{ Form }}} `;
  }
}

export const ProfileFormInfoWithStore = connect(mapStateToProps, ProfileFormInfo);
