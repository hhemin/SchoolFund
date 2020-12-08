import server from './http'

class Request {
  static async getFn({url='',tokenbool = true} = {}) {
    try {
      return await server({
        method: 'get',
        url,
        headers: {
        //   token:tokenbool?localStorage.getItem('token'):''
        },
        tokenbool
      }) 
    } catch(err) {
      throw err
    }
  }
  static async postFn({url='',tokenbool = true,data = ''} ={}) {
    try {
      return await server({
        method: 'post',
        url,
        headers: {
        //   token:tokenbool?localStorage.getItem('token'):''
        },
        data,
        tokenbool
      })
    }catch(err) {
      throw err
    }
  }
}

export default Request