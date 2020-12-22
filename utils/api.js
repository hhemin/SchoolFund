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
// K线图api
const Kdata = async ({
  granularity = 30,// 3600 604800
  currencyName = 'BTC'
}={}) => {
  return await request.postFn({
    url:'/api/web/KCurrency',
    data: {
      currencyName,
      granularity
    }
  })
}

export {
  Login,
  Register,
  GetMonName,
  TS,
  Kdata
}