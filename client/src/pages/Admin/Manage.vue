<script lang="ts">
import s from "./manage.module.scss";
import MovieItem from "../../components/MovieItem/MovieItem.vue";
import { serverURL } from "../../utils/axiosInstance";

export default {
  name: "admin.manage",
  components: { MovieItem },
  data() {
    return {
      s,
      serverURL,
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
          id: i.id,
          title: i.title,
          duration: i.duration,
          genres: i.genres,
          time: i.time,
          price: i.price.toFixed(2),
          banner: `${serverURL}/${i.banner}`,
        }"
        v-for="i of $store.state.movies.admin"
        :key="i.id"
        :admin="true"
      />
    </div>
  </div>
</template>
<style src="./manage.module.scss" lang="scss"></style>
