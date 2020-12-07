import request from './request';

const Login = async (data) => {
  return await request.postFn({
    url:'/api/web/login',
    data,
    token:false
  })
}

export {
  Login
}