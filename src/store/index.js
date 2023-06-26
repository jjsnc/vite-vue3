import { defineStore } from "pinia";
import { ref } from "vue";

// 第一个参数是应用程序中 store 的唯一 id

export const useSettingsStore = defineStore("settings", () => {
  let fixedHeader = ref(true);
  let tagsView = ref(true);
  let showSettings = ref(true);
  let sidebarLogo = ref(true);
  return { fixedHeader, tagsView, showSettings, sidebarLogo };
});

export const useAppStore = defineStore("app", () => {
  const sidebar = ref({
    opened: true,
    withoutAnimation: false,
  });
  const device = ref("desktop");
  const size = ref("medium");

  return { sidebar, device, size };
});
