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
  granularity = 604800,// 3600 604800
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

const Buy = async (data) => {
  return await request.postFn({
    url:'/api/web/transaction/buy',
    data,
    tokenbool:true
  })
}

const Sell = async (data) => {
  return await request.postFn({
    url:'/api/web/transaction/sell',
    data,
    tokenbool:true
  })
}

const NewMoney = async (data) => {
  return await request.postFn({
    url:'/api/web/newMoney',
    data,
    tokenbool:true
  })
}

const HoldCurrency = async (data) => {
  return await request.getFn({
    url:'/api/web/holdCurrency/query',
    tokenbool:true
  })
}
const PersonInfo = async () =>　{
  return await request.postFn({
    url:'/api/web/person',
    tokenbool:true
  })
}

export {
  Login,
  Register,
  GetMonName,
  TS,
  Kdata,
  Buy,
  Sell,
  NewMoney,
  HoldCurrency,
  PersonInfo
}