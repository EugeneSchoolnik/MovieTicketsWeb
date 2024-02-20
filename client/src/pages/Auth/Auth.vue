<script lang="ts">
import s from "./auth.module.scss";
import Input from "../../components/Input/Input.vue";

export default {
  name: "auth",
  components: { Input },
  data() {
    return {
      isLogin: true,
      user: {
        email: "",
        password: "",
      },
      s,
    };
  },
  methods: {
    getAction() {
      this.isLogin = this.$route.path === "/login";
    },
    onChangeAction() {
      setTimeout(this.getAction);
    },
  },
  beforeMount() {
    this.getAction();
    const email = (this.$route.query.email || "") as string;
    email && (this.user.email = email);
  },
};
</script>
<template>
  <div :class="s.auth">
    <RouterLink to="/" :class="s.goHome">
      <img src="../../assets/img/logo.jpg" alt="logo" />
      <h1>FilmFlicks</h1>
    </RouterLink>
    <h1>{{ isLogin ? "Authorization" : "Registration" }}</h1>
    <form>
      <Input label="Email" v-model="user.email" :value="user.email" />
      <Input label="Password" v-model="user.password" />
      <button class="btn">{{ isLogin ? "Log in" : "Register" }}</button>
      <p v-if="isLogin">
        You don't have an account yet? <RouterLink @click="onChangeAction()" to="/register">Sign up</RouterLink>
      </p>
      <p v-else>Already have an account? <RouterLink @click="onChangeAction()" to="/login">Sign in</RouterLink></p>
      <p v-if="isLogin">
        Forgot Password? <RouterLink @click="onChangeAction()" to="/restorepass">Restore</RouterLink>
      </p>
    </form>
  </div>
</template>
<style src="./auth.module.scss" lang="scss"></style>
