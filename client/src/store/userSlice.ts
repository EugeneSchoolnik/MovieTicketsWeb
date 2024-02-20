import { createSlice } from "./core";

export interface User {
  id: string;
  email: string;
}

const state: User = {
  id: "",
  email: "",
};

const userSlice = createSlice<User>({
  name: "user",
  state,
  reducers: {},
});

export default userSlice;
