<script lang="ts">
import s from "./profile.module.scss";
import Input from "../../components/Input/Input.vue";
import Header from "../../components/Header/Header.vue";
import server, { serverURL } from "../../utils/axiosInstance";
import type { order } from "../../store/slices/ordersSlice";
import { errors } from "../Admin/MovieForm/checkForm";

export default {
  name: "profile",
  components: { Input, Header },
  data() {
    return {
      serverURL,
      serverError: "",
      user: this.$store.state.user,
      order: null as order | null,
      ordersFilter: "all" as "all" | "active",
      changePass: {
        visible: false,
        old: {
          value: "",
          error: "",
        },
        password: {
          value: "",
          error: "",
        },
      },
      s,
    };
  },
  computed: {
    orders() {
      const orders = this.$store.state.orders.orders.slice().reverse();
      if (this.ordersFilter == "active") return orders.filter(i => i.isActive);
      return orders;
    },
  },
  methods: {
    detailsPopup(order: order) {
      this.order = order;
    },
    closePopup() {
      this.changePass.visible = false;
      this.order = null;
    },
    changePassword() {
      this.serverError = "";
      let error = false;
      if (!this.changePass.old.value) (error = true), (this.changePass.old.error = errors.empty);
      if (!this.changePass.password.value) (error = true), (this.changePass.password.error = errors.empty);
      if (error) return;

      server
        .post("/user/changepass", { old: this.changePass.old.value, password: this.changePass.password.value })
        .then(({ data }) => {
          alert(data.data);
          this.changePass.old.value = "";
          this.changePass.password.value = "";
          this.changePass.visible = false;
        })
        .catch(e => {
          if (!e.response) return console.log(e);
          this.serverError = e.response.data.message;
        });
    },
    logout() {
      server.get("/auth/logout");
      this.$store.commit("user.logout");
      this.$router.push("/");
    },
  },
  mounted() {
    const redirect = () => {
      if (this.$store.state.user.loaded) {
        if (!this.$store.state.user.id) this.$router.push("/login");
      } else setTimeout(redirect, 100);
    };
    redirect();
  },
};
</script>
<template>
  <Header />
  <div :class="s.profile">
    <div :class="s.control">
      <div :class="s.block">
        <span :title="user.email">{{ user.email }}</span>
        <button class="btn primary" @click="changePass.visible = true">Change password</button>
      </div>
      <button class="btn" @click="logout">Log out</button>
    </div>
    <div :class="s.orders">
      <h2>Orders</h2>
      <select v-model="ordersFilter">
        <option value="all">All</option>
        <option value="active">Active</option>
      </select>
      <ul ref="ordersRef">
        <li v-for="i of orders" :key="i.id">
          <span :class="s.title">{{ i.title }}</span>
          <span :class="s.date">{{ i.date.slice(5) }} {{ i.time }}</span>
          <span :class="`${s.isActive} ${i.isActive && s.active}`">Active</span>
          <button class="btn primary" @click="detailsPopup(i)">Details</button>
        </li>
      </ul>
    </div>
    <div v-if="changePass.visible || order" :class="s.popupBg" @click="closePopup"></div>
    <form @submit.prevent="changePassword" v-if="changePass.visible" :class="s.popup + ' ' + s.changePassPopup">
      <Input label="Old password" type="password" v-model="changePass.old.value" />
      <Input label="New password" type="password" v-model="changePass.password.value" />
      <span :class="s.serverError">{{ serverError }}</span>
      <button class="btn">Confirm</button>
    </form>
    <div v-if="order" :class="s.popup + ' ' + s.detailsPopup">
      <h2>Details</h2>
      <div :class="s.details">
        <p>
          ID: <span>{{ order.id }}</span>
        </p>
        <p>
          Payment Date: <span>{{ order.date }}</span>
        </p>
        <p>
          Valid till: <span>{{ order.date.slice(5) }} {{ order.time }}</span>
        </p>
        <p>
          Movie title: <span>{{ order.title }}</span>
        </p>
        <p>
          Movie duration: <span>{{ order.duration }}m</span>
        </p>
      </div>
      <div :class="s.qrcode">
        <h2 :class="`${order.isActive && s.active}`">Active</h2>
        <img :src="`${serverURL}/orders/qrcode?url=${serverURL}/orders/check/${order.id}`" alt="qrcode" />
      </div>
    </div>
  </div>
</template>
<style src="./profile.module.scss" lang="scss"></style>
