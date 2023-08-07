<template>
  <div>
    <el-scrollbar>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="!isCollapse"
        :collapse-transition="true"
        mode="vertical"
      >
        <Menu-item
          v-for="route in permission_routes"
          :key="route.id"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore, useAppStore } from "@/store";
import MenuItem from "./menuItem.vue";

let permissionStore = useUserStore();

let permission_routes = computed(() => {
  return permissionStore.menus;
});

let appStore = useAppStore();
let isCollapse = computed(() => {
  return appStore.sidebar.opened;
});

console.log(isCollapse.value)
</script>

<style>
.sidebar-container {
  background: #fff;
}

</style>
