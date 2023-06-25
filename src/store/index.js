import { defineStore } from "pinia";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id

export const useAppStore = defineStore("app", {
  state: () => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
    device: "desktop",
    size: "medium",
  }),
  actions: {},
});

export const useStore = defineStore("main", {
  // other options...
  state: () => ({
    name: "jjsnc",
    age: 18,
  }),
});
