import createStore from "./core";
import moviesSlice, { Movies } from "./slices/moviesSlice";
import ordersSlice, { Orders } from "./slices/ordersSlice";
import userSlice, { User } from "./slices/userSlice";

export interface State {
  user: User;
  movies: Movies;
  orders: Orders;
}

export default createStore([userSlice, moviesSlice, ordersSlice]);
