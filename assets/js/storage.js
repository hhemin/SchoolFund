/**
 * @use 目前全局导入了main.js
 * this.$storage.get('token'); 获取字段
 * this.$storage.put('token','data'); 存
 * this.$storage.remove('token'); 删
 * */
var storageUtil = {
  /**
   * @param key 
   * @param data
   * @param time 失效时间（秒）,默认8小时
   * @returns {boolean}
   */
  put: function (key, data) {
    try {
        if (!localStorage) {
          return false;
        }
        // var cacheVal = {val: data};
        localStorage.setItem(key, data);//存入缓存值
    } catch (e) {
    }
  },
  get: function (key) {
    try {
        if (!localStorage) {
            return false;
        }
        var cacheVal = localStorage.getItem(key);
        // var result = JSON.parse(cacheVal);
        //缓存不存在
        if (!cacheVal) {
          console.log('不存在啦')
          return null;
        }
        // if (now > result.exp) {
        //   // Toast('重新登陆啦！！！');
        //   console.log('缓存过期')
        //     this.remove(key);
        //     return "";
        // }
        return cacheVal;
    } catch (e) {
        this.remove(key);
        return null;
    }
  },
  // 设置时间的
  puttime: function (key, data, time) {
      try {
          if (!localStorage) {
            return false;
          }
          if (!time || isNaN(time)) {
            time = 288000000; // 8小时 多了一个0
          }
          // Math.round 转换为毫秒
          var cacheExpireDate = Math.round(new Date((new Date()).valueOf() + time));
          console.log(cacheExpireDate)
          // var cacheExpireDate = time;
          var cacheVal = {val: data, exp: cacheExpireDate};
          localStorage.setItem(key, JSON.stringify(cacheVal));//存入缓存值
      } catch (e) {
      }
  },
  // 设置时间的获取
  gettime: function (key) {
      try {
          if (!localStorage) {
              return false;
          }
          var cacheVal = localStorage.getItem(key);
          var result = JSON.parse(cacheVal);
          var now = new Date() - 1;
          //缓存不存在
          if (!result) {
            console.log('不存在啦')
              return null;
          }
          //缓存过期
          if (now > result.exp) {
            // Toast('重新登陆啦！！！');
            console.log('缓存过期')
              this.remove(key);
              return "";
          }
          return result.val;
      } catch (e) {
          this.remove(key);
          return null;
      }
  },
  // 移除
  remove: function (key) {
      if (!localStorage) {
          return false;
      }
      localStorage.removeItem(key);
  }
}

export default storageUtil;