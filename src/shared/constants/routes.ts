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
  BaseUrl: "https://ya-praktikum.tech/api/v2",
  SocketBaseUrl: "wss://ya-praktikum.tech/ws",
  ResourcesUrl: "resources",
  Auth: {
    user: "/auth/user",
    signup: "/auth/signup",
    signin: "/auth/signin",
    logout: "/auth/logout",
  },
  Users: {
    changeUser: "/user/profile",
    changePassword: "/user/password",
    changeAvatar: "/user/profile/avatar",
    search: "/user/search",
  },
  Chats: {
    getChats: "/chats",
    createChat: "/chats",
    deleteChat: "/chats",
    getToken: (id: number) => `/chats/token/${id}`,
  },
} as const;
