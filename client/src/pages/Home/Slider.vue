<script lang="ts">
import s from "./home.module.scss";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

const options = {
  type: "loop",
  perPage: 3,
  perMove: 1,
  autoplay: "playing",
};

export default {
  name: "home.slider",
  components: { Splide, SplideSlide },
  data() {
    return {
      s,
      options,
    };
  },
  mounted() {
    const countSlides = () => {
      if (window.innerWidth > 920) this.options.perPage = 3;
      if (window.innerWidth <= 920) this.options.perPage = 2;
      if (window.innerWidth <= 520) this.options.perPage = 1;
    };
    countSlides();
    window.addEventListener("resize", countSlides);
  },
};
</script>
<template>
  <div :class="s.sliderWrapper">
    <h2>Novelties</h2>
    <Splide :class="s.slider" :options="options">
      <SplideSlide>
        <div
          style="
            --image: url('https://c4.wallpaperflare.com/wallpaper/361/823/829/avengers-endgame-iron-man-robert-downey-jr-captain-america-chris-evans-hd-wallpaper-preview.jpg');
          "
        ></div>
      </SplideSlide>
      <SplideSlide>
        <div
          style="
            --image: url('https://c4.wallpaperflare.com/wallpaper/1022/525/87/movies-the-lord-of-the-rings-aragorn-viggo-mortensen-movie-posters-posters-the-return-of-the-king-entertainment-movies-hd-art-wallpaper-preview.jpg');
          "
        ></div>
      </SplideSlide>
      <SplideSlide>
        <div style="--image: url('https://image.tmdb.org/t/p/original/gEAqkpAAcL44uSg6LwO3NpIOALt.jpg')"></div>
      </SplideSlide>
      <SplideSlide>
        <div
          style="
            --image: url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f676b5811234c887ca62_top%20gun%20maverick-min.png');
          "
        ></div>
      </SplideSlide>
    </Splide>
  </div>
</template>
<style src="./home.module.scss" lang="scss"></style>
