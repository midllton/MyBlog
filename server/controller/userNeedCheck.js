const redis = require('../util/redisDB')
const util = require('../util/common')

exports.articleTalk = (req, res, next) => {
  if (req.body.a_id && req.body.talk) {
    // 组织字符串
    const talk = {talk: req.body.talk, time: Date.now(), username: req.username}
    const key = req.headers.fapp + ':article:' + req.body.a_id + ':talk'
    redis.get(key).then(data => {
      let tData = []
      if (data) {
        tData = data
      } else {
        tData.push(talk)
      }
      redis.set(key, tData)
      res.json(util.getReturnData(0, '评论成功'))
    })
  } else {
    res.json(util.getReturnData(1, '评论错误'))
  }
}