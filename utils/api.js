import request from './request';

const Login = async (data) => {
  return await request.postFn({
    url:'/api/web/login',
    data,
    tokenbool:false
  })
}

const Register = async (data) => {
  return await request.postFn({
    url:'/api/web/register',
    data,
    tokenbool:false
  })
}

const GetMonName = async (data) => {
  return await request.postFn({
    url: '/api/web/currency/query',
    data,
    // tokenbool: true
  })
}

const TS = async ({id = ''} ={}) => {
  return await request.getFn({
    url:'/api/admin/holdCurrency/query/'+id
  })
}

export {
  Login,
  Register,
  GetMonName,
  TS
}