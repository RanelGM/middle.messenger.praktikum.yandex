export const AppRoutes = {
  SignIn: "/",
  SignUp: "/sign-up",
  Profile: "/settings",
  ProfileEditInfo: "/settings/edit-info",
  ProfileEditPassword: "/settings/edit-password",
  Chat: "/messenger",
  ErrorNotFound: "/error-not-found",
  ErrorServer: "/error-server",
} as const;

export const ApiRoutes = {
  Auth: {
    user: "/auth/user",
    signup: "/auth/signup",
    signin: "/auth/signin",
    logout: "/auth/logout",
  },
  Users: {
    changeUser: "/user/profile",
    ChangePassword: "/user/password",
  },
} as const;
