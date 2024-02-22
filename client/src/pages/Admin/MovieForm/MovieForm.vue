<script lang="ts">
import s from "./movieform.module.scss";
import { genres } from "./genres";
import type { form } from "./checkForm";
import Input from "../../../components/Input/Input.vue";
import checkForm from "./checkForm";
import server from "../../../utils/axiosInstance";

type data = {
  s: CSSModuleClasses;
  serverError: string;
  form: form;
  genres: string[];
};

export default {
  name: "admin.movieform",
  components: { Input },
  data() {
    return {
      s,
      serverError: "",
      form: {
        title: {
          value: "",
          error: "",
        },
        genres: {
          value: [],
          error: "",
        },
        storyline: {
          value: "",
          error: "",
        },
        duration: {
          value: "",
          error: "",
        },
        time: {
          value: "",
          error: "",
        },
        price: {
          value: "",
          error: "",
        },
        banner: {
          value: {},
          error: "",
        },
        date: {
          value: "",
          error: "",
        },
        period: {
          value: "",
          error: "",
        },
      },
      genres,
    } as data;
  },
  methods: {
    onSubmit() {
      this.serverError = "";
      if (!checkForm(this.form)) return;

      const data = new FormData();
      Object.keys(this.form).forEach(k => data.append(k, this.form[k].value));

      server
        .post("/movies/new", data)
        .then(res => console.log(res))
        .catch(e => {
          if (e.response) {
            return (this.serverError = `Intersecting with these movies: ${e.response.data.message.join(", ")}`);
          }
        });
    },
  },
};
</script>
<template>
  <div :class="s.movieform">
    <i :class="`fa-solid fa-arrow-left ${s.back}`" @click="$router.go(-1)"></i>
    <h1>new movie</h1>
    <form @submit.prevent="onSubmit">
      <Input v-model="form.title.value" label="Title" :error="form.title.error" />
      <Input v-model="form.price.value" label="Price" type="number" :error="form.price.error" />
      <label>
        Genres
        <select v-model="form.genres.value" multiple>
          <option v-for="i of genres" :value="i.toLowerCase()">{{ i }}</option>
        </select>
        <span>{{ form.genres.error }}</span>
      </label>
      <Input v-model="form.storyline.value" isTextarea label="Storyline" :error="form.storyline.error" />
      <Input v-model="form.time.value" type="time" label="Time" :error="form.time.error" />
      <Input v-model="form.duration.value" type="number" label="Duration" :error="form.duration.error" />
      <Input v-model="form.date.value" type="date" label="Date" :error="form.date.error" />
      <Input v-model="form.period.value" type="number" label="Period (days)" :error="form.period.error" />
      <Input v-model="form.banner.value" type="file" label="Banner" :error="form.banner.error" />
      <span :class="s.serverError">{{ serverError }}</span>
      <button class="btn">Confirm</button>
    </form>
  </div>
</template>
<style src="./movieform.module.scss" lang="scss"></style>
