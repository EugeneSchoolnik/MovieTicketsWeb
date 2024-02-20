<script lang="ts">
import s from "./auth.module.scss";
import Input from "../../components/Input/Input.vue";
import { errors } from "../Admin/MovieForm/checkForm";
import server from "../../utils/axiosInstance";

export default {
  name: "auth",
  components: { Input },
  data() {
    return {
      isLogin: true,
      user: {
        email: {
          value: "",
          error: "",
        },
        password: {
          value: "",
          error: "",
        },
      },
      serverError: "",
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
    onSumbit() {
      const [email, password] = [this.user.email, this.user.password];
      (email.error = ""), (password.error = "");
      if (!email.value) return (this.user.email.error = errors.empty);
      if (!password.value) return (this.user.password.error = errors.empty);

      server
        .post(`/auth/${this.isLogin ? "login" : "register"}`, {
          email: email.value,
          password: password.value,
        })
        .then(({ data }) => {
          this.serverError = "";
        })
        .catch(({ response }) => {
          this.serverError = response.data.message;
        });
    },
  },
  beforeMount() {
    this.getAction();
    const email = (this.$route.query.email || "") as string;
    email && (this.user.email.value = email);
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
    <form @submit.prevent="onSumbit">
      <Input label="Email" v-model="user.email.value" :value="user.email.value" :error="user.email.error" />
      <Input label="Password" v-model="user.password.value" :error="user.password.error" />
      <span :class="s.serverError">{{ serverError }}</span>
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
