<template>
  <section class="app-main">
    <router-view :key="key" />
  </section>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

import { computed } from "vue";
const route = useRoute();

let key = computed(() => {
  return route.path;
});

// route.query
</script>
<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 90px);
  padding: 70px 20px 20px;
  overflow: auto;
  background-color: rgb(240, 245, 255);

}
</style>
