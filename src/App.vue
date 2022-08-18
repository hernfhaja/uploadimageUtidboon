<template>
  <div id="app" class="absolute top-0 bottom-0 left-0 right-0 bg-gold">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
.bg-gold {
  background-image: url("./assets/bg.png");
  background-size: cover;
}
</style>
