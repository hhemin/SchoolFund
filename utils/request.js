import server from './http'

class Request {
  static async getFn({url='',tokenbool = true} = {}) {
    try {
      return await server({
        method: 'get',
        url,
        // headers: {
        //   token:tokenbool?localStorage.getItem('token'):''
        // },
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
        // headers: {
        //   token:tokenbool?localStorage.getItem('token'):''
        // },
        data
      })
    }catch(err) {
      throw err
    }
  }
}

export default Request