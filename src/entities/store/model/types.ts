import type { store } from "./store";

export type StoreState = ReturnType<typeof store.getState>;
