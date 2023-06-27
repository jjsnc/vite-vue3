<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup name="Layout">
import { computed } from "vue";
import { Sidebar, Navbar, AppMain } from "./index.js";
import { useAppStore, useSettingsStore } from "@/store";

const appStore = useAppStore();
const setStore = useSettingsStore();

let needTagsView = computed(() => setStore.tagsView);
let fixedHeader = computed(() => setStore.fixedHeader);

let sidebarValue = computed(() => appStore.sidebar);
let deviceValue = computed(() => appStore.device);

let classObj = computed(() => {
  return {
    hideSidebar: !sidebarValue.value.opened,
    openSidebar: sidebarValue.value.opened,
    withoutAnimation: sidebarValue.value.withoutAnimation,
    mobile: deviceValue.value === "mobile",
  };
});
</script>

<style lang="scss">
.app-wrapper {
  display: flex;
  .sidebar-container {
    width: var(--sideBarWidth);
    height: 100vh;
    overflow: hidden;
  }
  .main-container {
    flex: 1;
    height: 100vh;
    transition: margin-left 0.28s;
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - var(--sideBarWidth));
      transition: width 0.28s;
    }
  }
}
</style>
