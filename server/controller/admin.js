let redis = require('../util/redisDB')
const util = require('../util/common')
const crypto = require('crypto')

// 修改导航菜单
exports.setNavMenu = (req, res, next) => {
  const key = req.headers.fapp + ':nav_menu' 
  const data = req.body.nav_menu // 获取传递的值
  // console.log('key:' + key)
  // console.log('data:' + data)
  redis.set(key, data)
  res.json(util.getReturnData(0, '修改成功'))
}

//修改底部导航栏
exports.setFooter = (req, res, next) => {
  const key = req.headers.fapp + ':footer'
  const data = req.body.footer
  // console.log('key:' + key)
  // console.log('data:' + data)
  redis.set(key, data)
  res.json(util.getReturnData(0, '修改成功'))
}

// 修改友情链接
exports.setLinks = (req, res, next) => {
  const key = req.headers.fapp + ':links'
  const data = req.body.links
  redis.set(key, data) 
  res.json(util.getReturnData(0, '修改成功'))
}

// 修改首页轮播内容
exports.setIndexPic = (req, res, next) => {
  const key = req.headers.fapp + ':indexPic'
  const data = req.body.indexPic
  console.log('data:' + data)
  redis.set(key, data)
  res.json(util.getReturnData(0, '修改成功'))
}

// 添加和修改文章，如果发送的数据中包含a_id，则表示修改文章，不是发布新文章，
// 此时直接更新；如果没有包含a_id，则首先通过Redis中的incr()方法获取ID，然后执行相关操作
exports.setArticle = (req, res, next) => {
  let data = req.body.article
  data.show = 0
  let key = ''
  if (data.a_id) { // a_id=1修改文章
    key = req.headers.fapp + ':article:' + data.a_id
    redis.set(key, data)
    res.json(util.getReturnData(0, '修改成功'))
  } else { //无a_id添加文章
    data.time = Date.now()
    key = req.headers.fapp + ':article:'
    redis.incr(key).then(id => {
      data.a_id = id
      key = key + id
      redis.set(key, data)
      let a_type = data.type
      let newKey = req.headers.fapp + ':a_type:' + a_type
      redis.get(newKey).then(newData => {
        if(!newData) {
          newData = []
        }
        newData.push(key)
        redis.set(req.headers.fapp + ':a_type:' + a_type, newData)
      })
      let tags = data.tag
      tags.map(item => {
        let tKeyMd5 = crypto.createHash('md5').update(item).digest('hex')
        redis.get(req.headers.fapp + ':tag:' + tKeyMd5).then(newData => {
          if(!newData) {
            newData = []
          }
          newData.push(key)
          redis.set(req.headers.fapp + ':tag:' + tKeyMd5, newData)
        })
      })
      redis.zadd(req.headers.fapp + ':a_time', key, Date.now())
      redis.zadd(req.headers.fapp + ':a_view', key, 0)
      redis.zadd(req.headers.fapp + ':a_like', key, 0)
      res.json(util.getReturnData(0, '新建文章成功'))
    })
  }
}

// 发布分类
exports.setArticleType = (req, res, next) => {
  // 获取传递的值，应当确定的是type中对应的唯一key是不重复的
  const data = req.body.type
  const key = req.headers.fapp + ':a_type'
  // 根据key直接更新内容
  redis.set(key, data)
  data.map(item => {
    const tKey = req.headers.fapp + ':a_type:' + item.uid
    redis.get(tKey).then(newData => {
      if (!newData) {
        redis.set(tKey, {})
      }
    })
  })
  res.json(util.getReturnData(0, '创建分类成功'))
}

// 文章的发布和删除
exports.showArticle = (req, res, next) => {
  const key = req.headers.fapp + ':article:' + req.body.a_id
  redis.get(key).then(data => {
    if (!data) {
      res.json(util.getReturnData(404, '没有该文章'))
    }
    if (data.show == 1) {
      data.show = 0
    } else {
      data.show = 1
    }
    redis.set(key, data)
  })
  res.json(util.getReturnData(0, '文章修改成功'))
}

// 获取全部用户
exports.getAllUser = (req, res, next) => {
  const re = req.headers.fapp + ':user:info:*'
  redis.scan(re).then(async (data) => {
    const result = data[1].map(item => {
      return redis.get(item).then(user => {
        return {username:user.username, login: user.login, ip: user.ip}
      })
    })
    const t_data = await Promise.all(result)
    res.json(util.getReturnData(0, '', t_data))
  })
}

// 封停用户
exports.stopLogin = (req, res, next) => {
  const key = req.headers.fapp + ':user:info:' + req.params.id
  redis.get(key).then(user => {
    console.log('user:' + user);
    if (user && user.login == 0) {
      user.login = 1
    } else {
      user.login = 0
    }
    redis.set(key, user)
    res.json(util.getReturnData(0, '用户修改成功'))
  })
}