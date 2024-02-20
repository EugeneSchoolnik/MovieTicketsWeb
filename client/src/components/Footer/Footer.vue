<script lang="ts">
import s from "./footer.module.scss";

export default {
  name: "footer",
  data() {
    return {
      s,
    };
  },
};
</script>
<template>
  <footer :class="s.footer">
    <nav>
      <div :class="s.block">
        <h3>Company</h3>
        <a href="#">About</a>
        <a href="#">Careers</a>
        <a href="#">Blog</a>
      </div>
      <div :class="s.block">
        <h3>Support</h3>
        <a href="#">Contact</a>
        <a href="#">FAQ</a>
        <a href="#">Privacy</a>
      </div>
      <div :class="s.block">
        <h3>Social</h3>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
      </div>
    </nav>
    <p>©2024 FilmFlicks, Inc. All rights reserved.</p>
  </footer>
</template>
<style src="./footer.module.scss" lang="scss"></style>
