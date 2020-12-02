import request from './request';

const getFn = async (data) => {
  return await request.getFn({url:'/users',token:false})
}

export {
  getFn
}