<script lang="ts">
import s from "./home.module.scss";
import { benefits } from "./benefits";
import Slider from "./Slider.vue";

export default {
  name: "home",
  components: { Slider },
  data() {
    return {
      s,
      benefits,
    };
  },
};
</script>
<template>
  <div :class="s.home">
    <Slider />
    <div :class="s.callToAction">
      <h2>Ready to dive into a world of cinematic wonder? Hop&nbsp;on!</h2>
      <div :class="s.btns">
        <button class="btn primary">Buy Tickets Now</button>
        <button class="btn">Browse Movies</button>
      </div>
    </div>
    <div :class="s.benefits">
      <h2>Why Choose Our Service</h2>
      <div :class="s.items">
        <div :class="s.item" v-for="{ title, text } of benefits" :key="title">
          <h4>{{ title }}</h4>
          <span>{{ text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./home.module.scss" lang="scss"></style>
