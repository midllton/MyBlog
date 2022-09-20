const redis = require('../util/redisDB')
const util = require('../util/common')
const crypto = require('crypto')

exports.userRegister = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const ip = req.ip
  if (username || password) {
    const key = 'booK:user:info:' + username
    redis.get(key).then(user => {
      if (user) {
        res.json(util.getReturnData(1, '用户已经存在'))
      } else {
        const userData = {
          phone: req.body.phone ? req.body.phone : '未知',
          nickname: req.body.nickname ? req.body.nickname : '未知',
          age: req.body.age ? req.body.age : '未知',
          sex: req.body.sex ? req.body.sex : '未知',
          ip,
          username,
          password,
          login: 0
        }
        redis.set(key, userData)
        res.json(util.getReturnData(0, '注册成功，请登录'))
      }
    })
  } else {
    res.json(util.getReturnData(1, '资料不完整'))
  }
}

// 用户登录API
exports.userLogin = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  redis.set('book:user:info:admin', {"login":"0", "password":"admin"}) //模仿登录数据
  redis.get(req.headers.fapp + ':user:info:' + username).then(data => {
    if (data) {
      if (data.login == 0) {
        if (data.password != password) {
          res.json(util.getReturnData(1, '用户名或者密码错误'))
        } else {
          const token = crypto.createHash('md5').update(Date.now() + username).digest('hex')
          const tokenKey = req.headers.fapp + ':user:token:' + token
          delete data.password
          redis.set(tokenKey, data)
          redis.expire(tokenKey, 1000)
          res.json(util.getReturnData(0, '登录成功', {token}))
        }
      } else {
        res.json(util.getReturnData(1, '用户被封停'))
      }
    } else {
      res.json(util.getReturnData(1, '登录失败'))
    }
  })
}
