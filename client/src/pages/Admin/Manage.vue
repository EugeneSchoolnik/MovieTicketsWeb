<script lang="ts">
import s from "./manage.module.scss";
import MovieItem from "../../components/MovieItem/MovieItem.vue";

export default {
  name: "admin.manage",
  components: { MovieItem },
  data() {
    return {
      s,
    };
  },
};
</script>
<template>
  <div :class="s.manage">
    <ul></ul>
  </div>
</template>
<style src="./manage.module.scss" lang="scss"></style>
