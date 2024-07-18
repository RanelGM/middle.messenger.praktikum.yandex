import type { Block } from "../../block";

export type RegisterRoute = {
  pathname: string;
  page: typeof Block;
  pageProps?: Record<string, unknown>;
  isFallbackRoute?: boolean;
};
