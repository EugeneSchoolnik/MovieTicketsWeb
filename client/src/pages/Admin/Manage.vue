<script lang="ts">
import s from "./manage.module.scss";
import MovieItem from "../../components/MovieItem/MovieItem.vue";

export default {
  name: "admin.manage",
  components: { MovieItem },
  data() {
    return {
      s,
    };
  },
};
</script>
<template>
  <div :class="s.manage">
    <RouterLink to="/admin/new" :class="`${s.add} btn`">Add movie</RouterLink>
    <div :class="s.list">
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
        :admin="true"
        v-for="(_, i) of Array.from({ length: 8 })"
        :key="i"
      />
    </div>
  </div>
</template>
<style src="./manage.module.scss" lang="scss"></style>
