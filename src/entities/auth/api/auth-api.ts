import { store } from "entities/store";
import { ApiRoutes } from "shared/constants";
import { BasicApi } from "shared/constructors";
import { checkIsServerError } from "shared/constructors/api/lib/checkIsServerError";
import { adaptUserFromServer } from "./adapters/adapt-user";
import type { ServerUser, User } from "../model/types";
import type { ApiState } from "shared/types";

export class AuthApi extends BasicApi {
  async getUser(): Promise<void> {
    const url = this.getUrl(ApiRoutes.Auth.user);
    const setUserApiState = (payload: Partial<ApiState<User | null>>) => {
      store.dispatch({ type: "SET_USER", payload });
    };

    try {
      setUserApiState({ isLoading: true });

      const response = await this.api.get(url, { headers: { "Content-Type": "application/json" } });
      const data = response.getData<ServerUser>();

      if (!response.isOK || checkIsServerError(data)) {
        setUserApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      const adaptedUser = adaptUserFromServer(data);

      setUserApiState({ data: adaptedUser, isLoadedOnce: true, isError: false });
    } catch (error: unknown) {
      setUserApiState({ isError: true });
      this.handleError(error);
    } finally {
      setUserApiState({ isLoading: false });
    }
  }
}
