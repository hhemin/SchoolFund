import request from './request'

const Login = async (data) => {
  return await request.postFn({
    url: '/api/admin/order/query',
    data,
    tokenbool: true
  })
}

const Logins = async (data) => {
  return await request.postFn({
    url: '/api/web/login',
    data,
    tokenbool: true
  })
}

export {
  Login,
  Logins
}
