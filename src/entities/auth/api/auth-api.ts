import { store } from "entities/store";
import { ApiRoutes } from "shared/constants";
import { BasicApi } from "shared/constructors";
import { checkIsServerError } from "shared/constructors/api/lib/checkIsServerError";
import { adaptUserFromServer } from "./adapters/adapt-user";
import type { ServerUser, SignIn, SignUp, User } from "../model/types";
import type { ApiState } from "shared/types";

class AuthApi extends BasicApi {
  async getUser(): Promise<void> {
    const url = this.getUrl(ApiRoutes.Auth.user);
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.get(url);
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
    const url = this.getUrl(ApiRoutes.Auth.signin);
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.post(url, { body: signInData });
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
    const url = this.getUrl(ApiRoutes.Auth.signup);
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.post(url, { body: signUpData });
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
    const url = this.getUrl(ApiRoutes.Auth.logout);
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.post(url);
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
}

export const authApi = new AuthApi();
