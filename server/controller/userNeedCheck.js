const redis = require('../util/redisDB')
const util = require('../util/common')
const crypto = require('crypto')

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

exports.getUserInfo = (req, res, next) => {
  const key = req.headers.fapp + ':user:info:' + req.params.username
  redis.get(key).then(data => {
    if (data) {
      if (req.params.username == req.username) {
        delete data.password
      } else {
        delete data.phone
        delete data.password
      }
      res.json(util.getReturnData(0, '', data))
    } else {
      res.json(util.getReturnData(1, '用户不存在'))
    }
  })
}

// 修改用户资料
exports.changeUserInfo = (req, res, next) => {
  const key = req.headers.fapp + ':user:info:' + req.username
  redis.get(key).then(data => {
    if (data) {
      let userData = {
        username:req.username,
        phone: req.body.phone ? req.body.phone : data.phone,
        nickname: req.body.nickname ? req.body.nickname : data.nickname,
        sex: req.body.sex ? req.body.sex : data.sex,
        password: req.body.password ? req.body.password : data.password,
        login: data.login
      }
      redis.set(key, userData)
      res.json(util.getReturnData(0, '修改成功'))
    } else {
      res.json(util.getReturnData(1, '修改失败'))
    }
  })
}

exports.sendMail = (req, res, next) => {
  const checkKey = req.headers.fapp + ':user:info:' + req.params.username
  redis.get(checkKey).then(user => {
    if (user && req.body.text) {
      const userKey1 = req.headers.fapp + ':user:' + req.username + ':mail'
      const userKey2 = req.headers.fapp + ':user:' + req.params.username + ':mail'
      const mailKey = req.headers.fapp  + ':mail:'
      // 保证两个用户之间可能出现一次对话
      redis.get(userKey1).then(mail => {
        if (!mail) {
          mail = []
        }
        const has = false
        for (let i = 0; i < mail.length; i++) {
          if(mail[i].users.indexOf(req.params.username) > -1) {
            has = true
            mailKey = mailKey + mail[i].m_id
            redis.get(mailKey).then((mailData = []) => {
              mailData.push({text: req.body.text, time: Date.now(), read: []})
              redis.set(mailKey, mailData)
              res.json(util.getReturnData(0, '发送私信成功'))
              next()
            })
          }
        } 
        if (!has) {
          redis.incr(mailKey).then((m_id) => {
            mailKey = mailKey + m_id
            redis.set(mailKey, [{text: req.body.text, time: Date.now(), read: []}])
            mail.push({m_id: m_id, users: [req.username, req.params.username]})
            redis.set(userKey1, mail)
            redis.get(userKey2).then(newMail => {
              if(!newMail) {
                newMail = []
              }
              newMail.push({m_id: m_id, users: [req.username, req.params.username]})
              redis.set(userKey2, newMail)
              res.json(util.getReturnData(0, '发送新私信成功'))
            })
          })
        }
      })
    } else {
      res.json(util.getReturnData(1, '用户不存在'))
    }
  })
}

// 获取私信列表
exports.getMails = (req, res, next) => {
  const key = req.headers.fapp + ':user:' + req.username + ':mail'
  redis.get(key).then(data => {
    res.json(util.getReturnData(0, '', data))
  })
}

// 获取私信
exports.getUserMail = (req, res, next) => {
  const key = req.headers.fapp + ':user:' + req.username + ':mail'
  let data = {}
  redis.get(key).then(mail => {
    if (!mail) {
      res.json(util.getReturnData(0, '', []))
    }
    let has = false
    for (let i = 0; i < mail.length; i++) {
      if (mail[i].m_id == req.params.id) {
        has = true
        mail[i].users.splice(mail[i].users.indexOf(req.username), 1)
        data.toUser = mail[i].users[0]
        let newKey = req.headers.fapp + ':mail:' + req.params.id
        redis.get(newKey).then(newData => {
          if (newData[newData.length - 1].read.indexOf(req.username) < 0) {
            newData[newData.length - 1].read.push(req.username)
          }
          data.mail = newData
          redis.set(newKey, newData)
          res.json(util.getReturnData(0, '', data))
          next()
        })
        break
      }
    }
    if (!has) {
      res.json(util.getReturnData(1, '请求错误'))
    }
  }) 
}

// 获取所有文章分类
exports.getArticleType = (req, res, next) => {
  redis.get(req.headers.fapp + ':a_type').then(data => {
    res.json(util.getReturnData(0, '', data))
  })
}

// 文章点赞或踩
exports.articleLike = (req, res, next) => {
  const member = req.headers.fapp + ':article:' + req.params.id
  const like = req.params.like
  if (like == 0) {
    redis.zincrby(req.headers.fapp + ':a_like', member, -1)
  } else {
    redis.zincrby(req.headers.fapp + 'a_like', member)
  }
  res.json(util.getReturnData(0, 'success'))
}

// 文章收藏
exports.articleCollection = (req, res, next) => {
  const key = req.headers.fapp + ':user:' +req.username + ':collection'
  const a_key = req.headers.fapp + ':article:' + req.params.id
  redis.get(a_key).then(data => {
    if (data) {
      redis.get(key).then(newData => {
        if (!newData) {
          newData = []
        }
        newData.push({time: Date.now(), a_id: req.params.id, title: data.title})
        redis.set(key, newData)
        res.json(util.getReturnData(0, 'success'))
      })
    } else {
      res.json(util.getReturnData(1, '文章不存在'))
    }
  })
}

// 获取收藏地址
exports.getCollection = (req, res, next) => {
  const key = req.headers.fapp + ':user:' + req.username + ':collection'
  redis.get(key).then(data => {
    res.json(util.getReturnData(0, '', data))
  })
}