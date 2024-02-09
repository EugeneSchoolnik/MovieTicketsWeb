<script lang="ts">
import s from "./app.module.scss";
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
import Home from "./pages/Home/Home.vue";

export default {
  name: "app",
  components: { Header, Footer, Home },
  data() {
    return {
      s,
    };
  },
};
</script>

<template>
  <div :class="s.app">
    <Header />
    <main :class="s.main">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style src="./app.module.scss" lang="scss"></style>
