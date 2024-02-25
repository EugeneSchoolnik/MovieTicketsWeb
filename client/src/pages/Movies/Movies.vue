<script lang="ts">
import s from "./movies.module.scss";
import Header from "../../components/Header/Header.vue";
import MovieItem from "../../components/MovieItem/MovieItem.vue";
import BuyTicket from "./BuyTicket.vue";
import { movie } from "../../store/slices/moviesSlice";
import { serverURL } from "../../utils/axiosInstance";

export default {
  name: "movies",
  components: { Header, MovieItem, BuyTicket },
  data() {
    return {
      s,
      serverURL,
      currentMovie: null as null | movie,
    };
  },
};
</script>
<template>
  <Header />
  <div :class="s.movies">
    <MovieItem
      :movie="{
        id: i.id,
        title: i.title,
        duration: i.duration,
        genres: i.genres.replace(/,/g, ', '),
        time: i.time,
        price: i.price.toFixed(2),
        banner: `${serverURL}/${i.banner}`,
      }"
      v-for="i of $store.state.movies.movies"
      :key="i.id"
      @click="currentMovie = i"
    />
    <p :class="s.empty" v-if="!$store.state.movies.movies.length">There are no more movies today</p>
    <BuyTicket :movie="(currentMovie as any)" @closePopup="currentMovie = null" />
  </div>
</template>
<style src="./movies.module.scss" lang="scss"></style>
