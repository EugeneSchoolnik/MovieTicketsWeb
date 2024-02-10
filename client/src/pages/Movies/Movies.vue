<script lang="ts">
import s from "./movies.module.scss";
import Header from "../../components/Header/Header.vue";
import MovieItem from "./MovieItem.vue";

export default {
  name: "movies",
  components: { Header, MovieItem },
  data() {
    return {
      s,
    };
  },
};
</script>
<template>
  <Header />
  <div :class="s.movies">
    <MovieItem
      v-for="_ of Array.from({ length: 8 })"
      title="Avangers 3"
      :duration="120"
      :genres="['fantasy', 'action']"
      time="02:00pm"
      :price="4"
      banner="https://c4.wallpaperflare.com/wallpaper/361/823/829/avengers-endgame-iron-man-robert-downey-jr-captain-america-chris-evans-hd-wallpaper-preview.jpg"
    />
  </div>
</template>
<style src="./movies.module.scss" lang="scss"></style>
