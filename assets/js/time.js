// 格式ISO时间格式
const TimeISO = (dateForm) => {
  if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
      return "";
  }else{
      var dateee = new Date(dateForm ).toJSON();
      var date = new Date(+new Date(dateee)+ 8 * 3600 * 1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
      return date;
  }
}

export {
  TimeISO
}