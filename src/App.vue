<template>
  <div
    id="app"
    class="bg-cover bg-gradient-to-l from-cyan-200 to-blue-400 ... absolute top-0 right-0 bottom-0 left-0 p-5"
  >
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

<style></style>
