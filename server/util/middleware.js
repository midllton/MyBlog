const { allowApp } = require('../config/app')
const redis = require('../util/redisDB')
const util = require('./common')

exports.checkApp = (req, res, next) => {
  //console.log(req.headers)
  if (!allowApp.includes(req.headers.fapp)) { //在传递时，将该参数命名为fapp，也就是说，当请求头中的fapp字段为book字符串时，符合要求
    res.json(util.getReturnData(500, '来源不正确'))
  } else {
    next()
  }
}

exports.checkUser = (req, res, next) => {
  console.log('检测用户登录情况');
  if (req.headers.token) {
    const key = req.headers.fapp + ':user:token:' + req.headers.token
    redis.get(key).then(data => {
      if (data) {
        req.username = data.username
        next()
      } else {
        res.json(util.getReturnData(403, '登录已过期，请重新登录'))
        // next()
      }
    })
  } else {
    res.json(util.getReturnData(403, '请登录'))
  }
}