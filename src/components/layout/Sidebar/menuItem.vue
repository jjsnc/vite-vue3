<template>
  <el-menu-item
    v-if="hasOneShowingChild(item.children, item)"
    :index="item.newLink"
    @click="handleActiveRouter(item)"
  >
    <el-icon v-if="item.icon"><setting /></el-icon>
    <template #title>{{ item.name }}</template>
  </el-menu-item>
  <el-sub-menu v-else :index="item.id">
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{ item.name }}</span>
    </template>
    <Menu-item v-for="child in item.children" :key="child.id" :item="child" />
  </el-sub-menu>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

import { computed, defineProps } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const route = useRoute();
const router = useRouter();

defineProps({
  item: {
    type: Object,
    default(rawProps) {
      return {};
    },
  },
});
function hasOneShowingChild(children = [], parent) {
  if (children.length > 0) {
    return false;
  } else {
  }
  return true;
}

function handleActiveRouter(item) {
  const path = route.path;
  let { newLink } = item;
  if (path == newLink) {
    return;
  }
  router.push({ path: newLink || "/" });
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
