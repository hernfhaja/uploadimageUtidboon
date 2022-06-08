<template>
  <div id="app" class="absolute top-0 bottom-0 left-0 right-0 bg-gold">
    <Uploadimage />
  </div>
</template>

<script>
import Uploadimage from "./components/Uploadimage.vue";

export default {
  name: "App",
  components: {
    Uploadimage,
  },
};
</script>

<style>
.bg-gold {
  background-image: url("./assets/bg.png");
  background-size: cover;
}
</style>
