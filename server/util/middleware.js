const { allowApp } = require('../config/app')
const util = require('./common')
exports.checkApp = (req, res, next) => {
  //console.log(req.headers)
  if (!allowApp.includes(req.headers.fapp)) { //在传递时，将该参数命名为fapp，也就是说，当请求头中的fapp字段为book字符串时，符合要求
    res.json(util.getReturnData(500, '来源不正确'))
  } else {
    next()
  }
}