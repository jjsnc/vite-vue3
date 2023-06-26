import request from "@/utils/http";

export function HttpBackendValidate(params) {
  return request({
    url: "platform/api/modelapi/LoginForm/backendValidate",
    method: "get",
    data: params,
  });
}

export function httpIn(params) {
  return request({
    url: "/platform/sign/PlatformApi/method/in",
    method: "post",
    data: params,
  });
}

export function httpMessages(params) {
  return request({
    url: "platform/language/PlatformApi/method/messages",
    method: "post",
    data: params,
  });
}

export function httpGet(params) {
  return request({
    url: "/platform/const/PlatformApi/method/get",
    method: "post",
    data: params,
  });
}

export function httpAllows(params) {
  return request({
    // url: '/platform/permission/PlatformApi/method/allows',
    url: "api/manage/permission/tmp_allow_list",
    method: "post",
    data: params,
  });
}

export function httpModules(params) {
  return request({
    url: "/platform/permission/PlatformApi/method/modules",
    method: "post",
    data: params,
  });
}

export function httpUser(params) {
  return request({
    url: "/platform/permission/PlatformApi/method/user",
    method: "post",
    data: params,
  });
}

// 以下是新的接口

export function httpSignIn(params) {
  return request({
    url: "/api/manage/sign/in",
    method: "post",
    data: params,
  });
}
export function httpPermissionModulesLogin(params) {
  return request({
    url: "api/manage/permission/modules_login",
    method: "post",
    data: params,
  });
}

export function httpPermissionModules(params) {
  return request({
    url: "/api/manage/permission/modules",
    method: "post",
    data: params,
  });
}

export function httpPermissionAllows(params) {
  return request({
    // url: '/api/manage/permission/allows',
    url: "/api/manage/permission/tmp_allow_list",
    method: "post",
    data: params,
  });
}

export function httpPermissionGet(params) {
  return request({
    url: "/api/manage/permission/get",
    method: "post",
    data: params,
  });
}

export function httpPermissionMessages(params) {
  return request({
    url: "/api/manage/permission/messages",
    method: "post",
    data: params,
  });
}
