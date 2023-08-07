const TokenKey = "system_token";
const PermissionMenus = "system_menus";
const system_user = "system_user";

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function getMenus() {
  return localStorage.getItem(PermissionMenus);
}

export function setMenus(Menus) {
  return localStorage.setItem(PermissionMenus, Menus);
}

export function removeMenus() {
  return localStorage.removeItem(PermissionMenus);
}

export function setUser(user) {
  return localStorage.setItem(system_user, user);
}

export function removeUser() {
  return localStorage.removeItem(system_user);
}

export function getUser() {
  return localStorage.getItem(system_user);
}
