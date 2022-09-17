let redis = require('../util/redisDB')
const util = require('../util/common')

exports.getNavMenu = (req, res, next) => {
  let key = req.headers.fapp + ':nav_menu'
  redis.get(key).then((data) => {
    console.log(data)
    res.json(util.getReturnData(0, '', data))
  })
}

exports.getFooter = (req, res, next) => {
  console.log(123);
  let key = req.headers.fapp + ':footer'
  console.log('key:' + key)
  redis.get(key).then((data) => {
    console.log(data)
    res.json(util.getReturnData(0, '', data))
  })
}