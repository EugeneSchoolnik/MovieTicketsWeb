<script lang="ts">
import s from "./movies.module.scss";
import Header from "../../components/Header/Header.vue";
import MovieItem from "../../components/MovieItem/MovieItem.vue";
import BuyTicket from "./BuyTicket.vue";

export default {
  name: "movies",
  components: { Header, MovieItem, BuyTicket },
  data() {
    return {
      s,
      movie: null as any | null,
    };
  },
};
</script>
<template>
  <Header />
  <div :class="s.movies">
    <MovieItem
      :movie="{
        id: '0140149124',
        title: 'Avangers 3',
        duration: '120',
        genres: ['fantasy', 'action'],
        time: '02:00pm',
        price: '4',
        banner:
          'https://c4.wallpaperflare.com/wallpaper/361/823/829/avengers-endgame-iron-man-robert-downey-jr-captain-america-chris-evans-hd-wallpaper-preview.jpg',
      }"
      v-for="(_, i) of Array.from({ length: 8 })"
      :key="i"
      @click="movie = {}"
    />
    <BuyTicket :movie="movie" @closePopup="movie = null" />
  </div>
</template>
<style src="./movies.module.scss" lang="scss"></style>
