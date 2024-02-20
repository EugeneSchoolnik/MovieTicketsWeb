import { createSlice } from "../core";

export interface User {
  id: string;
  email: string;
  loaded: boolean;
}

const state: User = {
  id: "",
  email: "",
  loaded: false,
};

const userSlice = createSlice<User>({
  name: "user",
  state,
  reducers: {
    setUser(s, p) {
      s.id = p.userId;
      s.email = p.email;
    },
    loaded(s) {
      s.loaded = true;
    },
    logout(s) {
      s.id = "";
      s.email = "";
    },
  },
});

export default userSlice;
