import { store } from "./store";
import type { StoreState } from "./types";
import type { Block, BlockProps } from "shared/constructors";

export const connect = <T extends BlockProps>(
  mapStateToProps: (state: StoreState) => T,
  Component: typeof Block,
): typeof Block => {
  return class extends Component {
    constructor(args: Record<string, unknown> = {}) {
      super(args);

      store.subscribe(() => {
        this.setProps(mapStateToProps(store.getState()));
      });
    }
  };
};
