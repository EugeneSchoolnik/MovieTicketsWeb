<script lang="ts">
import s from "./app.module.scss";

export default {
  name: "app",
  data() {
    return {
      s,
    };
  },
};
</script>

<template>
  <div :class="s.app"></div>
</template>

<style lang="scss">
@import url("app.module.scss");
</style>
