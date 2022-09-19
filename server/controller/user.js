const redis = require('../util/redisDB')
const util = require('../util/common')
let user = {}

user.userLogin = () => {}
user.userRegister = (req, res, next) => {
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

module.exports = user