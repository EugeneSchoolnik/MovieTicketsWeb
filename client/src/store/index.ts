import createStore from "./core";
import userSlice, { User } from "./userSlice";

export interface State {
  user: User;
}

export default createStore([userSlice]);
