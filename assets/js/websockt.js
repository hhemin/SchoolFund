class Sockt {
   constructor() {
     this.ws = '12312'
   }

   oncreated({url = ''} = {}) {
     return function({id =''}={}) {
      console.log(``)
       return this.ws = new WebSocket(`${url}/${id}`)
     }
    
   }

   open() {
     this.ws.open = () => {
      console.log("数据发送中...");
     }
   }
   
   onmessage() {
      ws.onmessage = (evt) => {
        console.log(evt);
      };
   }

   onclose() {
     ws.close();
   }
}

export {
  Sockt
}