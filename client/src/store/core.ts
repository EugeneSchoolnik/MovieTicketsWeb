import { createStore as vuexCreateStore } from "vuex";

type reducer<T, ASYNC extends boolean = false> = (state: T, payload: any) => ASYNC extends true ? Promise<void> : void;

interface SliceProps<T> {
  name: string;
  state: T;
  reducers: Record<string, reducer<T> | reducer<T, true>>;
}
type sliceReturn<T> = { name: string; state: T; mutations: object; actions: object };

const AsyncFunction = (async () => {}).constructor;

export const createSlice = <T>(slice: SliceProps<T>): sliceReturn<T> => {
  const { name, state, reducers } = slice;

  const mutations = {};
  const actions = {};

  for (const k of Object.keys(reducers)) {
    reducers[k] instanceof AsyncFunction
      ? (actions[name + "." + k] = (s: any, p = undefined) => reducers[k](s[name], p))
      : (mutations[name + "." + k] = (s: any, p = undefined) => reducers[k](s[name], p));
  }

  return { name, state, mutations, actions };
};

const createStore = <T extends sliceReturn<any>[]>(slices: T) => {
  const state = Object.fromEntries(slices.map(({ name, state }) => [name, state]));
  const mutations = slices.reduce((acc, slice) => ({ ...acc, ...slice.mutations }), {});
  const actions = slices.reduce((acc, slice) => ({ ...acc, ...slice.actions }), {});

  return vuexCreateStore({
    state: () => state,
    mutations,
    actions,
  });
};

export default createStore;
