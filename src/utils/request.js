/* eslint-disable */
import server from './http'

class Request {
  static async getFn({url='',tokenbool = true} = {}) {
    try {
      return await server({
        method: 'get',
        url,
        headers: {
          token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
        },
        auth
      }) 
    } catch(err) {
      throw err
    }
  }
  static async postFn({url='',tokenbool = true,data = '',loading = false} ={}) {
    try {
      return await server({
        method: 'post',
        url,
        headers: {
          Authorization:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
        },
        data
      })
    }catch(err) {
      throw err
    }
  }
}

export default Request