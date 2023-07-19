import { defineStore } from "pinia";
import { ref } from "vue";
import _ from "lodash";
import {
  httpSignIn,
  httpPermissionModulesLogin,
  httpPermissionAllows,
  httpPermissionGet,
  httpPermissionMessages,
} from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  set_modules,
  get_modules,
  set_allows,
  get_allows,
  set_consts,
  get_consts,
  set_user,
  get_user,
  get_messages,
  set_messages,
  set_accessed_routes,
  get_accessed_routes,
  set_authority_routes,
  get_authority_routes,
} from "@/utils/auth";
function filterRoutes(modules) {
  //多平台link 修改为单平台link
  _.map(modules, (item) => {
    let newLink = "";
    let { link } = item;
    if (!link) {
      return;
    }
    newLink = link.split("#")[1];
    if (newLink.includes("atd")) {
      newLink = newLink.split("atd")[1];
    } else if (newLink.includes("platform")) {
      newLink = newLink.split("platform")[1];
    }
    item.newLink = newLink;
  });

  let menus = [];

  let parentMenus = _.filter(modules, { parentId: String(0) });

  // 尊重历史代码 和原来保持一致 我也不知道为啥要这样
  parentMenus = parentMenus.filter((item) => {
    return item.menu !== "0";
  });

  _.map(parentMenus, (module) => {
    let childrenMenus = _.filter(modules, {
      parentId: String(module.id),
      menu: "1",
    });
    module.children = childrenMenus;
    menus.push(module);
  });

  return menus;
}
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
  function handleToggleSidebar() {
    this.sidebar.opened = !this.sidebar.opened;
  }

  return { sidebar, device, size, handleToggleSidebar };
});

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    permission_routes: JSON.parse(get_accessed_routes() || "{}"),
    authorityRoutes: JSON.parse(get_authority_routes() || "[]"),
  }),
  actions: {
    handleSetRoutes(routes) {
      this.permission_routes = routes;
    },
    handleGenerateRoutes(modules) {
      console.log(555);

      return new Promise((resolve) => {
        //对模块转换为数据集并根据 sort排序
        modules = _.sortBy(_.map(modules), function (o) {
          return _.toInteger(o.sort);
        });
        let accessedRoutes = filterRoutes(modules);

        this.handleSetRoutes(accessedRoutes);

        set_accessed_routes(JSON.stringify(accessedRoutes));

        resolve(accessedRoutes);
      });
    },
    handleAuthorityRoutes(modules) {
      return new Promise((resolve) => {
        let _routes = [];

        modules.forEach((item) => {
          if (item.link.length > 2) {
            let smallRoute = item?.link?.split("#")[1].slice(4);
            _routes.push(smallRoute);
          }
        });
        this.authorityRoutes = _routes;
        set_authority_routes(JSON.stringify(_routes));
        resolve();
      });
    },
  },
});

export const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    name: "",
    avatar: "",
    introduction: "",
    roles: [], //以上系统自带下面是新增
    modules: JSON.parse(get_modules() || "[]") || [],
    allows: JSON.parse(get_allows() || "[]") || [],
    consts: JSON.parse(get_consts() || "[]") || [],
    user: JSON.parse(get_user() || "[]") || {},
    messages: JSON.parse(get_messages() || "[]") || {},
  }),
  actions: {
    handleSetToken(token) {
      this.token = token;
    },
    handleSetIntroduction(introduction) {
      this.introduction = introduction;
    },
    handleSetName(name) {
      this.name = name;
    },
    handleSetAvatar(avatar) {
      this.avatar = avatar;
    },
    handleSetRoles(roles) {
      this.roles = roles;
    },
    // 以下是新系统自定义
    handleSetModules(modules) {
      this.modules = modules;
    },
    handleSetAllows(allows) {
      this.allows = allows;
    },
    handleSetConsts(consts) {
      this.consts = consts;
    },
    handleSetUser(user) {
      this.user = user;
    },
    handleSetMessages(messages) {
      this.messages = messages;
    },
    handleLogin(userInfo) {
      const { username, password } = userInfo;
      return new Promise(async (resolve, reject) => {
        try {
          let userTokenInfo = await httpSignIn({
            username: username.trim(),
            password: password,
          });
          setToken(userTokenInfo.token);

          let messages = await httpPermissionMessages([
            "atd",
            ["user", "role", "modules", "common", "page"],
            ["zh_cn", "en"],
          ]);

          let consts = await httpPermissionGet([
            ["atd_warning_setting", "atd_all_config", "env"],
          ]);
          let allows = await httpPermissionAllows();
          let modules = await httpPermissionModulesLogin([]);
          let user = userTokenInfo;
          this.handleSetToken(userTokenInfo.token);
          this.handleSetModules(modules);
          this.handleSetAllows(allows);
          this.handleSetConsts(consts);
          this.handleSetUser(user);
          this.handleSetMessages(messages);

          set_modules(JSON.stringify(modules));
          set_allows(JSON.stringify(allows));
          set_consts(JSON.stringify(consts));
          set_user(JSON.stringify(user));
          set_messages(JSON.stringify(messages));

          let permissionStore = usePermissionStore();

          permissionStore.handleGenerateRoutes(modules);
          permissionStore.handleAuthorityRoutes(modules);

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
        this.handleSetRoles([]);
        removeToken();
        resolve();
      });
    },
    handleResetToken() {
      return new Promise((resolve) => {
        this.handleSetToken("");
        this.handleSetRoles([]);
        removeToken();
        resolve();
      });
    },
  },
});
