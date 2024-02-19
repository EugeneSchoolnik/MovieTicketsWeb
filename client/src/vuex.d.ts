import { State } from "./store";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: {
      state: State;
      commit(func: string, payload?: any): void;
      dispatch(func: string, payload?: any): void;
    };
  }
}
