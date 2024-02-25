<script lang="ts">
import s from "./restorepass.module.scss";
import Input from "../../components/Input/Input.vue";
import { RouterLink } from "vue-router";
import { errors } from "../Admin/MovieForm/checkForm";
import server from "../../utils/axiosInstance";

export default {
  name: "restorepass",
  components: { Input, RouterLink },
  data() {
    return {
      serverError: "",
      email: {
        value: "",
        error: "",
      },
      restore: {
        token: "",
        email: "",
      },
      s,
    };
  },
  methods: {
    onSubmit() {
      this.serverError = "";
      const email = this.email;

      if (email.value == "") return (email.error = errors.empty);

      if (this.restore.token)
        return server
          .post("/user/restorepass", { email: this.restore.email, token_: this.restore.token, password: email.value })
          .then(({ data }) => {
            alert("Password has been changed");
            this.$store.commit("user.setUser", data.data);
            this.$store.commit("orders.getOrders");
            this.$router.push("/profile");
          })
          .catch(e => {
            if (!e.response) return console.log(e);
            this.serverError = e.response.data.message;
          });

      server
        .post("/user/restorepass", { email: email.value })
        .then(({ data }) => {
          alert(data.data);
          this.$router.push("/login");
        })
        .catch(e => {
          if (!e.response) return console.log(e);
          this.serverError = e.response.data.message;
        });
    },
  },
  beforeMount() {
    if (this.$route.query.token) {
      this.restore.token = this.$route.query.token as string;
      this.restore.email = this.$route.query.email as string;
    }
  },
};
</script>
<template>
  <div :class="s.restorepass">
    <h1>Password Restore</h1>
    <i @click="$router.go(-1)" :class="`${s.back} fa-solid fa-circle-arrow-left`"></i>
    <form @submit.prevent="onSubmit">
      <Input
        :label="restore.token ? 'Password' : 'Email'"
        v-model="email.value"
        :error="email.error"
        :type="restore.token ? 'password' : 'email'"
      />
      <span :class="s.serverError">{{ serverError }}</span>
      <button class="btn">Submit</button>
    </form>
  </div>
</template>
<style src="./restorepass.module.scss" lang="scss"></style>
