<script lang="ts">
import Input from "../Input/Input.vue";
import s from "./header.module.scss";

export default {
  name: "header",
  components: { Input },
  data() {
    return {
      s,
      email: "",
    };
  },
};
</script>
<template>
  <header :class="s.header">
    <div :class="s.title">
      <img src="../../assets/img/logo.jpg" alt="logo" />
      <h1>FilmFlicks</h1>
    </div>
    <div :class="s.description">
      Welcome to the ultimate movie buff’s paradise! Dive into the sea of the latest blockbusters, timeless classics,
      and everything in-between. Getting your movie tickets has never been this exciting.
    </div>
    <div :class="s.register">
      <Input v-model="email" placeholder="example@email.com" />
      <button class="btn" @click="console.log(email)">Sign up</button>
    </div>
  </header>
</template>
<style src="./header.module.scss" lang="scss"></style>
