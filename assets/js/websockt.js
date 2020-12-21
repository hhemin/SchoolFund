class Sockt {
   constructor() {
     this.ws = {}
   }
// 创建
   oncreated({url = ''} = {}) {
     const That = this
     return function({id =''}={}) {
       console.log(`${url}/${id}`)
       return That.ws = new WebSocket(`${url}/${id}`)
     }
    
   }
// 打开
   open() {
     this.ws.open = () => {
      console.log("数据发送中...");
     }
   }
  //  接收信息
   onmessage() {
     return this.ws;
      // this.ws.onmessage = (evt) => {
      //   console.log(evt);
      //   return evt
      // };
   }
// 关闭
   onclose() {
     this.ws.close();
   }
}

export {
  Sockt
}