<script lang="ts">
import s from "./app.module.scss";
import Footer from "./components/Footer/Footer.vue";

export default {
  name: "app",
  components: { Footer },
  data() {
    return {
      s,
    };
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
