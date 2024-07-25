import { store } from "entities/store";
import { ApiRoutes } from "shared/constants";
import { BasicApi, checkIsServerError } from "shared/constructors";
import { adaptUserFromServer, adaptUserToChanges, adaptUsersFromServer } from "./adapters/adapt-user";
import type { PasswordUpdate, ServerUser, SignIn, SignUp, User } from "../model/types";
import type { ApiState } from "shared/types";

class UserApi extends BasicApi {
  async getUser(): Promise<void> {
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.get(ApiRoutes.Auth.user);
      const data = response.getData<ServerUser>();

      if (!data || !response.isOK || checkIsServerError(data)) {
        setUserApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      const adaptedUser = adaptUserFromServer(data);

      setUserApiState({ data: adaptedUser, isError: false });
    } catch (error: unknown) {
      setUserApiState({ isError: true });
      this.handleError(error);
    } finally {
      setUserApiState({ isLoading: false, isLoadedOnce: true });
    }
  }

  async signIn(signInData: SignIn): Promise<void> {
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.post(ApiRoutes.Auth.signin, { body: signInData });
      const data = response.getData<{ id: number }>();

      if (!response.isOK || checkIsServerError(data)) {
        setUserApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      void this.getUser();
    } catch (error: unknown) {
      setUserApiState({ isError: true });
      this.handleError(error);
    } finally {
      setUserApiState({ isLoading: false });
    }
  }

  async signUp(signUpData: SignUp): Promise<void> {
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.post(ApiRoutes.Auth.signup, { body: signUpData });
      const data = response.getData();

      if (!response.isOK || checkIsServerError(data)) {
        setUserApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      void this.getUser();
    } catch (error: unknown) {
      setUserApiState({ isError: true });
      this.handleError(error);
    } finally {
      setUserApiState({ isLoading: false });
    }
  }

  async logout(): Promise<void> {
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.post(ApiRoutes.Auth.logout);
      const data = response.getData();

      if (!response.isOK || checkIsServerError(data)) {
        setUserApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      setUserApiState({ data: null, isError: false });
    } catch (error: unknown) {
      setUserApiState({ isError: true });
      this.handleError(error);
    } finally {
      setUserApiState({ isLoading: false });
    }
  }

  async changeUser(user: User, onSuccess: () => void): Promise<void> {
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    const changes = adaptUserToChanges(user);

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.put(ApiRoutes.Users.changeUser, { body: changes });
      const data = response.getData<ServerUser>();

      if (!data || !response.isOK || checkIsServerError(data)) {
        setUserApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      const adaptedUser = adaptUserFromServer(data);

      setUserApiState({ data: adaptedUser, isError: false });
      onSuccess();
    } catch (error: unknown) {
      setUserApiState({ isError: true });
      this.handleError(error);
    } finally {
      setUserApiState({ isLoading: false });
    }
  }

  async changePassword(update: PasswordUpdate, onSuccess: () => void): Promise<void> {
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.put(ApiRoutes.Users.changePassword, { body: update });
      const data = response.getData();

      if (!response.isOK || checkIsServerError(data)) {
        setUserApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      setUserApiState({ isError: false });
      onSuccess();
    } catch (error: unknown) {
      setUserApiState({ isError: true });
      this.handleError(error);
    } finally {
      setUserApiState({ isLoading: false });
    }
  }

  async changeAvatar(formData: FormData): Promise<void> {
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.put(ApiRoutes.Users.changeAvatar, {
        body: formData,
      });
      const data = response.getData<ServerUser>();

      if (!data || !response.isOK || checkIsServerError(data)) {
        setUserApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      const adaptedUser = adaptUserFromServer(data);

      setUserApiState({ isError: false, data: adaptedUser });
    } catch (error: unknown) {
      setUserApiState({ isError: true });
      this.handleError(error);
    } finally {
      setUserApiState({ isLoading: false });
    }
  }

  async searchUsers(login: string): Promise<void> {
    const setSearchUsersApiState = (payload: Partial<ApiState<User[] | null>>) => {
      store.dispatch({ type: "SET_SEARCH_USERS", payload });
    };

    try {
      setSearchUsersApiState({ isLoading: true });

      const response = await this.api.post(ApiRoutes.Users.search, {
        body: { login },
      });
      const data = response.getData<ServerUser[]>();

      if (!data || !response.isOK || checkIsServerError(data)) {
        setSearchUsersApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      const adaptedUsers = adaptUsersFromServer(data);

      setSearchUsersApiState({ isError: false, data: adaptedUsers });
    } catch (error: unknown) {
      setSearchUsersApiState({ isError: true });
      this.handleError(error);
    } finally {
      setSearchUsersApiState({ isLoading: false });
      store.dispatch({ type: "SET_CHECKED_USERS", payload: {} });
    }
  }
}

export const userApi = new UserApi();
