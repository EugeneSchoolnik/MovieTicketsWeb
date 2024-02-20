<script lang="ts">
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
    };
  },
};
</script>
<template>
  <div v-if="movie" :class="s.popupBg" @click="$emit('closePopup')"></div>
  <div v-if="movie" :class="s.moviesBuyTicket">
    <div :class="s.info">
      <img
        :src="'https://c4.wallpaperflare.com/wallpaper/361/823/829/avengers-endgame-iron-man-robert-downey-jr-captain-america-chris-evans-hd-wallpaper-preview.jpg'"
        alt="banner"
      />
      <div :class="s.details">
        <span>Avangers 3</span>
        <span><i>Genres:</i> fantasy, action</span>
        <span
          ><i>Storyline:</i> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates commodi aliquam a dicta
          minus numquam perspiciatis nihil repudiandae voluptatem, facere, harum consequuntur. Numquam nulla nesciunt
          dolorem esse veritatis sunt tenetur!</span
        >
        <span><i>Duration:</i>120m</span>
        <span><i>Time:</i> 02:00pm</span>
      </div>
    </div>
    <span :class="s.price">Payable amount: <b>$4</b></span>
    <button class="btn">Pay</button>
  </div>
</template>
<style src="./movies.module.scss" lang="scss"></style>
