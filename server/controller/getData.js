let redis = require('../util/redisDB')
const util = require('../util/common')
const crypto = require('crypto')

exports.getNavMenu = (req, res, next) => {
  const key = req.headers.fapp + ':nav_menu'
  redis.get(key).then((data) => {
    console.log(data)
    res.json(util.getReturnData(0, '', data))
  })
}

exports.getFooter = (req, res, next) => {
  const key = req.headers.fapp + ':footer'
  console.log('key:' + key)
  redis.get(key).then(data => {
    console.log(data)
    res.json(util.getReturnData(0, '', data))
  })
}

exports.getLinks = (req, res, next) => {
  const key = req.headers.fapp + ':links'
  redis.get(key).then(data => {
    res.json(util.getReturnData(0, '', data))
  })
}

exports.getIndexPic = (req, res, next) => {
  const key = req.headers.fapp + ':indexPic'
  redis.get(key).then(data => {
    res.json(util.getReturnData(0, '', data))
  })
}

exports.getHotArticle = (req, res, next) => {
  const key = req.headers.fapp + ':a_view'
  redis.zrevrange(key, 0 ,4).then(async (data) => {
    let result = data.map((item) => {
      return redis.get(item.member).then(newData => {
        if(newData && data.show != 0) {
          return {
            'title':newData.title,
            'date':util.getLocalDate(newData.time),
            'id':newData.a_id,
            'view':newData.score
          }
        } else {
          return { title:'文章暂未上线', date:'', id:0 }
        }
      })
    })
    let t_data = await Promise.all(result)
    res.json(util.getReturnData(0, '', t_data))
  })
}
exports.getNewArticle = (req, res, next) => {
  const key = req.headers.fapp + ':a_time'
  let isAdmin = false
  if (req.headers.token) {
    // 如果是管理员，则应当获得所有文章
    const pKey = req.headers.fapp + ':user:power:' + req.headers.token
    redis(pKey).then(power => {
      if (power == 'admin') {
        redis.zrevrange(key, 0 ,-1).then(async (data) => {
          const result = data.map(item => {
            return redis.get(item.member).then(newData => {
              if (newData) {
                return {title: newData.title, date: util.getLocalDate(item.score), id: newData.a_id, show: newData.show}
              }
            })
          })
          const t_data = await Promise.all(result)
          res.json(util.getReturnData(0, '', t_data))
        })
      } else {
        res.json(util.getReturnData(1, '其他权限'))
      }
    })
  } else {
    // 获取有序列表的值
    redis.zrevrange(key, 0, -1).then(async (data) => {
      let result = data.map(item => {
        return redis.get(item.member).then(newData => {
          if (data && data.show != 0) {
            return {title: newData.title, date: util.getLocalDate(item.score), id: newData.a_id}
          } else {
            return { title:'文章暂未上线', date:'', id:0 }
          }
        })
      })
      let t_data = await Promise.all(result)
      res.json(util.getReturnData(0, '', t_data))
    })
  } 
}

exports.getArticle = (req, res, next) => {
  const key = req.headers.fapp + ':article:' + req.params.id
  redis.get(key).then(data => {
    if (data) {
      if (data.show == 1) { //show=0文章添加未发布
        // 获取文章阅读量
        redis.zscore(req.headers.fapp + ':a_view', key).then(view => {
          data.view = view
          // 获取文章点赞量
          redis.zscore(req.headers.fapp + ':a_like', key).then(like => {
            data.like = like
            res.json(util.getReturnData(0, 'success', data))
          })
        })
        // // 获取文章分类详情
        // redis.get(req.headers.fapp + ':a_type').then(type => {
        //   type.map(item => {
        //     if (item.uid == data.type) {
        //       data.typename = item.name
        //     }
        //   })
        // })
      } else {
        res.json(util.getReturnData(403, '该文章已被删除或不存在'))
      }
    } else {
      res.json(util.getReturnData(404, '该文章已被删除或不存在'))
    }
  })
}

exports.getArticleTalk = (req, res, next) => {
  const key = req.headers.fapp + ':article:' + req.params.id + ':talk'
  redis.get(key).then(data => {
    res.json(util.getReturnData(0, 'success', data))
  })
}

// 根据小标签或分类获取所有的文章
exports.getArticles = (req, res, next) => {
  let key = req.headers.fapp
  if (req.body.tag) {
    let tKeyMd5 = crypto.createHash('md5').update(req.body.tag).digest('hex')
    key = key + ':tag:' + tKeyMd5
  } else if (req.body.type) {
    key = key + ':a_type:' + req.body.type
  } else {
    res.json(util.getReturnData(1, '数据参数错误'))
  }
  redis.get(key).then(async (data) => {
    let result = data.map(item => {
      return redis.get(item).then(newData => {
        if (newData && newData.show != 0) {
          return {title: newData.title, date: util.getLocalDate(newData.time), id: newData.a_id}
        } else {
          return {title: '文章暂未上线', date: '', id: 0}
        }
      })
    })
    let t_data = await Promise.all(result)
    res.json(util.getReturnData(0, '', t_data))
  })
}

// 浏览量自动加1
exports.viewArticle = (req, res, next) => {
  const key = req.headers.fapp + ':article:' + req.params.id
  redis.zincrby(req.headers.fapp + ':a_view', key)
  res.json(util.getReturnData(0, 'success'))
}