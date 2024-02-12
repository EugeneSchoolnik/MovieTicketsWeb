<script lang="ts">
import s from "./movieItem.module.scss";
import { Movie } from "./movie";

export default {
  name: "movieItem",
  props: {
    movie: {
      type: Object,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      s,
      movie: this.movie as Movie,
    };
  },
};
</script>
<template>
  <div :class="s.movieItem">
    <div :class="s.info">
      <h2>{{ movie.title }}</h2>
      <span>{{ movie.duration }}m</span>
      <strong>{{ movie.genres.join(", ") }}</strong>
    </div>
    <img :src="movie.banner" alt="img" />
    <span :class="s.details"
      >{{ movie.time }} - <b>${{ movie.price }}</b></span
    >
    <div v-if="admin" :class="s.adminBlock">
      <RouterLink :to="`/admin/edit?id=${movie.id}`"><i class="fa-solid fa-pen-to-square"></i></RouterLink>
      <i class="fa-solid fa-trash"></i>
    </div>
  </div>
</template>
<style src="./movieItem.module.scss" lang="scss"></style>
