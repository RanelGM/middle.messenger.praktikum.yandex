import { connect } from "entities/store";
import { userApi } from "entities/user";
import { AppRoutes } from "shared/constants";
import { Block, router } from "shared/constructors";
import { cn, isEqual, validateEmail, validateLogin, validateName, validatePhone } from "shared/lib";
import { Form } from "shared/ui";
import type { StoreState } from "entities/store/model/types";
import type { User } from "entities/user";
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
    userApi: state.userReducer.user,
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
        onSubmit: (submitData) => {
          this.handleSubmit(submitData);
        },
      }),
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!isEqual(oldProps.userApi?.data ?? {}, newProps.userApi?.data ?? {})) {
      this.children.Form?.setProps({ values: newProps.userApi?.data ?? {} });
    }

    this.children.Form?.setProps({ isLoading: newProps.userApi.isLoading });

    return true;
  }

  private redirect() {
    router.go(AppRoutes.Profile);
  }

  private handleSubmit(submitData: SubmitState) {
    const user = (this.props as MapProps).userApi?.data;

    if (!user) {
      return;
    }

    const updates: User = { ...user, ...submitData };
    const isSameData = isEqual(user, updates);

    if (isSameData) {
      this.redirect();

      return;
    }

    this.redirect();
    void userApi.changeUser({ ...user, ...submitData });
  }

  override render() {
    return /* HTML */ `<div>{{{ Form }}}</div>`;
  }
}

export const ProfileFormInfoWithStore = connect(mapStateToProps, ProfileFormInfo);
