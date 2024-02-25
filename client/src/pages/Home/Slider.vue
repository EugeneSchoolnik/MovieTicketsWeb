<script lang="ts">
import s from "./home.module.scss";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import { serverURL } from "../../utils/axiosInstance";

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
      serverURL,
    };
  },
  computed: {
    novelties() {
      if (this.$store.state.movies.movies.length < 3) return [];
      const length = Math.min(this.$store.state.movies.movies.length, 5);
      return this.$store.state.movies.movies.slice(-1 * length);
    },
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
  <div :class="s.sliderWrapper" v-if="novelties.length">
    <h2>Novelties</h2>
    <Splide :class="s.slider" :options="options">
      <SplideSlide v-for="i of novelties">
        <div
          :style="`
            --image: url('${serverURL}/${i.banner}');
          `"
        ></div>
      </SplideSlide>
    </Splide>
  </div>
</template>
<style src="./home.module.scss" lang="scss"></style>
