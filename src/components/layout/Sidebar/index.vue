<template>
  <div>
    <div>
      <el-button @click="handleToggle" type="primary">Primary</el-button>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <Menu-item
        v-for="route in permission_routes"
        :key="route.id"
        :item="route"
      />
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePermissionStore } from "@/store";

import MenuItem from "./menuItem.vue";

const isCollapse = ref(false);

let permissionStore = usePermissionStore();

let permission_routes = computed(() => {
  return permissionStore.permission_routes;
});
function handleToggle() {
  isCollapse.value = !isCollapse.value;
}
</script>

<style>
.sidebar-container {
  background: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
