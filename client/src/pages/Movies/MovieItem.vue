<script lang="ts">
import s from "./movies.module.scss";

export default {
  name: "movieItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    genres: {
      type: Array,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      s,
    };
  },
};
</script>
<template>
  <RouterLink to="#" :class="s.movieItem">
    <div :class="s.info">
      <h2>{{ title }}</h2>
      <span>{{ duration }}m</span>
      <strong>{{ genres.join(", ") }}</strong>
    </div>
    <img :src="banner" alt="img" />
    <span :class="s.details"
      >{{ time }} - <b>${{ price }}</b></span
    >
  </RouterLink>
</template>
<style src="./movies.module.scss" lang="scss"></style>
