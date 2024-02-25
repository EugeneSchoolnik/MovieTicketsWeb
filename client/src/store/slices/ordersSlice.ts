import server from "../../utils/axiosInstance";
import { createSlice } from "../core";

export type order = {
  id: string;
  date: string;
  time: string;
  title: string;
  duration: number;
  isActive: boolean;
};

export interface Orders {
  orders: order[];
}

const state: Orders = {
  orders: [],
};

const ordersSlice = createSlice<Orders>({
  name: "orders",
  state,
  reducers: {
    getOrders(s) {
      server
        .get("/orders/get")
        .then(({ data }) => {
          s.orders = data.data;
        })
        .catch(e => console.log(e));
    },
    add(s, p) {
      s.orders.push(p);
    },
  },
});

export default ordersSlice;
