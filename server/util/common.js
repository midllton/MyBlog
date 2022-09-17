let util = {}
util.getReturnData = (code, message = '', data = []) => {
  if (!data) data = []
  return {code, message, data}
}
module.exports = util