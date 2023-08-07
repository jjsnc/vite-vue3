import service from '@/utils/http'

export function httpLogin(params) {
  return service({
    url: 'adminapi/login',
    method: 'post',
    data: params
  })
}




