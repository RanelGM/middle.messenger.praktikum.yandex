import Handlebars from "handlebars";
import { ProfileEditInfoSubPage } from "./subpages/profile-edit-info-subpage";
import { ProfileEditPasswordSubPage } from "./subpages/profile-edit-password-subpage";
import { ProfileMainSubPage } from "./subpages/profile-main-subpage";
import { ProfileAvatar } from "./ui/profile-avatar";
import { ProfileFormInfo } from "./ui/profile-form-info";
import { ProfileInput } from "./ui/profile-input";
import { ProfilePrevious } from "./ui/profile-previous";
import "./profile-page.scss";

const Partials = {
  ProfileEditInfoSubPage,
  ProfileEditPasswordSubPage,
  ProfileMainSubPage,
  ProfileAvatar,
  ProfileFormInfo,
  ProfileInput,
  ProfilePrevious,
};

Object.entries(Partials).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

export { default as ProfilePage } from "./profile-page.hbs?raw";
