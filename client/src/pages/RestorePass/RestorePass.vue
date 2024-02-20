<script lang="ts">
import s from "./restorepass.module.scss";
import Input from "../../components/Input/Input.vue";
import { RouterLink } from "vue-router";

export default {
  name: "restorepass",
  components: { Input, RouterLink },
  data() {
    return {
      email: "",
      s,
    };
  },
};
</script>
<template>
  <div :class="s.restorepass">
    <h1>Password Restore</h1>
    <i @click="$router.go(-1)" :class="`${s.back} fa-solid fa-circle-arrow-left`"></i>
    <form>
      <Input label="Email" v-model="email" />
      <button class="btn">Submit</button>
    </form>
  </div>
</template>
<style src="./restorepass.module.scss" lang="scss"></style>
