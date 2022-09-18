let util = {}

util.getReturnData = (code, message = '', data = []) => {
  if (!data) data = []
  return {code, message, data}
}

//转换为格式化时间
util.getLocalDate = (t) => {
  let date = new Date(parseInt(t))
  return date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getDate()
}

module.exports = util