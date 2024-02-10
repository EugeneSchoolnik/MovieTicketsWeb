<script lang="ts">
import s from "./profile.module.scss";
import Input from "../../components/Input/Input.vue";
import Header from "../../components/Header/Header.vue";

export default {
  name: "profile",
  components: { Input, Header },
  data() {
    return {
      showPopup: {
        changePass: false,
        orderDetails: false,
      },
      s,
    };
  },
  methods: {
    closePopup() {
      this.showPopup.changePass = false;
      this.showPopup.orderDetails = false;
    },
  },
};
</script>
<template>
  <Header />
  <div :class="s.profile">
    <div :class="s.control">
      <div :class="s.block">
        <span title="user@mail.com">user@mail.com</span>
        <button class="btn primary" @click="showPopup.changePass = true">Change password</button>
      </div>
      <button class="btn">Log out</button>
    </div>
    <div :class="s.orders">
      <h2>Orders</h2>
      <select>
        <option value="all">All</option>
        <option value="active">Active</option>
      </select>
      <ul>
        <li>
          <span :class="s.title">Avengers 3</span>
          <span :class="s.date">09.02 02:00pm</span>
          <span :class="s.isActive + ' ' + s.active">Active</span>
          <button class="btn primary" @click="showPopup.orderDetails = true">Details</button>
        </li>
        <li v-for="_ of Array.from({ length: 8 })">
          <span :class="s.title">Avengers 3</span>
          <span :class="s.date">05.02 02:00pm</span>
          <span :class="s.isActive">Inactive</span>
          <button class="btn primary">Details</button>
        </li>
      </ul>
    </div>
    <div v-if="Object.values(showPopup).find(i => i)" :class="s.popupBg" @click="closePopup"></div>
    <div v-if="showPopup.changePass" :class="s.popup + ' ' + s.changePassPopup">
      <Input label="Old password" />
      <Input label="New password" />
      <button class="btn">Confirm</button>
    </div>
    <div v-if="showPopup.orderDetails" :class="s.popup + ' ' + s.detailsPopup">
      <h2>Details</h2>
      <div :class="s.details">
        <p>ID: <span>85109854</span></p>
        <p>Payment Date: <span>09.02.2024</span></p>
        <p>Valid till: <span>09.02 03:00pm</span></p>
        <p>Movie title: <span>Avengers 3</span></p>
        <p>Movie duration: <span>1h</span></p>
      </div>
      <div :class="s.qrcode">
        <h2 :class="s.active">Active</h2>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
          alt="qrcode"
        />
      </div>
    </div>
  </div>
</template>
<style src="./profile.module.scss" lang="scss"></style>
