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
  methods: {
    onRegister() {
      this.$router.push(`/register?email=${this.email}`);
    },
  },
};
</script>
<template>
  <header :class="s.header">
    <RouterLink to="/login" :class="`${s.loginLink} btn`">Log in</RouterLink>
    <RouterLink to="/" :class="s.title">
      <img src="../../assets/img/logo.jpg" alt="logo" />
      <h1>FilmFlicks</h1>
    </RouterLink>
    <div :class="s.description">
      Welcome to the ultimate movie buff’s paradise! Dive into the sea of the latest blockbusters, timeless classics,
      and everything in-between. Getting your movie tickets has never been this exciting.
    </div>
    <form @submit.prevent="onRegister" :class="s.register">
      <Input v-model="email" placeholder="example@email.com" />
      <button class="btn" @click="console.log(email)">Sign up</button>
    </form>
  </header>
</template>
<style src="./header.module.scss" lang="scss"></style>
