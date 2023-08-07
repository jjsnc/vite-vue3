import { defineStore } from "pinia";
import { ref } from "vue";
import _ from "lodash";

import { httpLogin } from "@/api/login";
import {
  getToken,
  setToken,
  removeToken,
  getMenus,
  setMenus,
  removeMenus,
  setUser,
  removeUser,
  getUser,
} from "@/utils/auth";

// 第一个参数是应用程序中 store 的唯一 id

export const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    menus: JSON.parse(getMenus() || "[]") || [],
    user_info: JSON.parse(getUser() || "[]") || {},
  }),
  actions: {
    handleSetToken(token) {
      this.token = token;
    },
    // 以下是新系统自定义
    handleSetMenus(menus) {
      this.menus = menus;
    },
    handleSetUser(user) {
      this.user_info = user;
    },

    handleLogin(userInfo) {
      const { username, password } = userInfo;
      return new Promise(async (resolve, reject) => {
        try {
          let allLoginInfo = await httpLogin({
            username: username.trim(),
            password: password,
          });

          let token = allLoginInfo.token;
          let menus = allLoginInfo.menus;
          let user_info = allLoginInfo.user_info;
          this.handleSetToken(token);
          this.handleSetMenus(menus);
          this.handleSetUser(user_info);
          setToken(token);
          setMenus(JSON.stringify(menus));
          setUser(JSON.stringify(user_info));
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
    // user logout
    handleLogout() {
      return new Promise((resolve, reject) => {
        this.handleSetToken("");
        this.handleSetMenus([]);
        this.handleSetUser({});
        removeToken();
        removeMenus();
        removeUser();
        resolve();
      });
    },
    handleResetToken() {
      return new Promise((resolve) => {
        this.handleSetToken("");
        this.handleSetMenus([]);
        this.handleSetUser({});
        removeToken();
        removeMenus();
        removeUser();
        resolve();
      });
    },
  },
});

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
  function handleToggleSidebar() {
    this.sidebar.opened = !this.sidebar.opened;
  }

  return { sidebar, device, size, handleToggleSidebar };
});


