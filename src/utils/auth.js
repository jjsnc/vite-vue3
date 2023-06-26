const TokenKey = "Admin-Token";
const PermissionMenus = "permission_menus";
const permission_modules = "permission_modules";
const permission_allows = "permission_allows";
const system_consts = "system_consts";
const system_user = "system_user";
const accessed_routes = "accessed_routes";
const authority_routes = "authority_routes";
const system_messages = "system_messages";

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function setMenus(Menus) {
  return localStorage.setItem(PermissionMenus, Menus);
}

export function removeMenus() {
  return localStorage.removeItem(PermissionMenus);
}

export function set_modules(modules) {
  return localStorage.setItem(permission_modules, modules);
}

export function remove_modules() {
  return localStorage.removeItem(permission_modules);
}

export function get_modules() {
  return localStorage.getItem(permission_modules);
}

export function set_allows(modules) {
  return localStorage.setItem(permission_allows, modules);
}

export function remove_allows() {
  return localStorage.removeItem(permission_allows);
}

export function get_allows() {
  return localStorage.getItem(permission_allows);
}

export function set_consts(consts) {
  return localStorage.setItem(system_consts, consts);
}

export function remove_consts() {
  return localStorage.removeItem(system_consts);
}

export function get_consts() {
  return localStorage.getItem(system_consts);
}

export function set_user(user) {
  return localStorage.setItem(system_user, user);
}

export function remove_user() {
  return localStorage.removeItem(system_user);
}

export function get_user() {
  return localStorage.getItem(system_user);
}

export function set_messages(messages) {
  return localStorage.setItem(system_messages, messages);
}

export function remove_messages() {
  return localStorage.removeItem(system_messages);
}

export function get_messages() {
  return localStorage.getItem(system_messages);
}

export function set_accessed_routes(routes) {
  return localStorage.setItem(accessed_routes, routes);
}

export function remove_accessed_routes() {
  return localStorage.removeItem(accessed_routes);
}

export function get_accessed_routes() {
  return localStorage.getItem(accessed_routes);
}

export function get_authority_routes() {
  return localStorage.getItem(authority_routes);
}

export function set_authority_routes(routes) {
  return localStorage.setItem(authority_routes, routes);
}
