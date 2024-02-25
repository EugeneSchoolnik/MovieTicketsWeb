<script lang="ts">
import server, { serverURL } from "../../utils/axiosInstance";
import s from "./movies.module.scss";

export default {
  name: "movies.buyTicket",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      s,
      serverURL,
    };
  },
  methods: {
    buyTicket() {
      server
        .post("/orders/new", { movieId: this.movie.id })
        .then(({ data }) => {
          alert("Like, successfully purchased");
          this.$store.commit("orders.add", data.data);
        })
        .catch(e => console.log(e));
    },
  },
};
</script>
<template>
  <div v-if="movie" :class="s.popupBg" @click="$emit('closePopup')"></div>
  <div v-if="movie" :class="s.moviesBuyTicket">
    <div :class="s.info">
      <img :src="`${serverURL}/${movie.banner}`" alt="banner" />
      <div :class="s.details">
        <span>{{ movie.title }}</span>
        <span><i>Genres:</i> {{ movie.genres.replaceAll(",", ", ") }}</span>
        <span><i>Storyline:</i> {{ movie.storyline }}</span>
        <span><i>Duration:</i>{{ movie.duration }}m</span>
        <span><i>Time:</i> {{ movie.time }}</span>
      </div>
    </div>
    <span :class="s.price"
      >Payable amount: <b>${{ movie.price.toFixed(2) }}</b></span
    >
    <button class="btn" @click="buyTicket">Pay</button>
  </div>
</template>
<style src="./movies.module.scss" lang="scss"></style>
