<script lang="ts">
import s from "./app.module.scss";
import Footer from "./components/Footer/Footer.vue";
import server from "./utils/axiosInstance";

export default {
  name: "app",
  components: { Footer },
  data() {
    return {
      s,
    };
  },
  beforeMount() {
    server
      .get("/auth/me")
      .then(({ data }) => {
        this.$store.commit("user.setUser", data.data);
        this.$store.commit("user.loaded");
      })
      .catch(e => {
        this.$store.commit("user.loaded");
        console.log(e);
      });
  },
};
</script>

<template>
  <div :class="s.app">
    <main :class="s.main">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style src="./app.module.scss" lang="scss"></style>
