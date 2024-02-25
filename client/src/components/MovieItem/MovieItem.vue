<script lang="ts">
import { movie } from "../../store/slices/moviesSlice";
import server from "../../utils/axiosInstance";
import s from "./movieItem.module.scss";

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
      movie: this.movie as movie,
    };
  },
  methods: {
    deleteMovie(id: string) {
      server.post(`/admin/delete?id=${id}`).then(() => location.reload());
    },
  },
};
</script>
<template>
  <div :class="s.movieItem">
    <div :class="s.info">
      <h2>{{ movie.title }}</h2>
      <span>{{ movie.duration }}m</span>
      <strong>{{ movie.genres }}</strong>
    </div>
    <img :src="movie.banner" alt="img" />
    <span :class="s.details"
      >{{ movie.time }} - <b>${{ movie.price }}</b></span
    >
    <div v-if="admin" :class="s.adminBlock">
      <RouterLink :to="`/admin/edit?id=${movie.id}`"><i class="fa-solid fa-pen-to-square"></i></RouterLink>
      <i class="fa-solid fa-trash" @click="deleteMovie(movie.id)"></i>
    </div>
  </div>
</template>
<style src="./movieItem.module.scss" lang="scss"></style>
