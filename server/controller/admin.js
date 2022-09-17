let redis = require('../util/redisDB')
const util = require('../util/common')

// 修改导航菜单
exports.setNavMenu = (req, res, next) => {
  let key = req.headers.fapp + ':nav_menu' 
  let data = req.body.nav_menu // 获取传递的值
  // console.log('key:' + key)
  // console.log('data:' + data)
  redis.set(key, data)
  res.json(util.getReturnData(0, '修改成功'))
}

//修改底部导航栏
exports.setFooter = (req, res, next) => {
  let key = req.headers.fapp + ':footer'
  let data = req.body.footer
  // console.log('key:' + key)
  // console.log('data:' + data)
  redis.set(key, data)
  res.json(util.getReturnData(0, '修改成功'))
}