let redis = require('../util/redisDB')
const util = require('../util/common')
const { getReturnData } = require('../util/common')

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
    res.json(getReturnData(0, '', data))
  })
}

exports.getHotArticle = (req, res, next) => {
  const key = req.headers.fapp + ':a_view'
  redis.zrevrange(key, 0 ,4).then(async (data) => {
    let result = data.map((item) => {
      return redis.get(item.member).then(newData => {
        if(newData & data.show != 0) {
          return {
            'title':newData.title,
            'date':util.getLocalDate(newData.time),
            'id':newData.a_id,
            'view':newData.score
          }
        } else {
          return {
            title:'文章暂未上线',
            date:'',
            id:0
          }
        }
      })
    })
    let t_data = await Promise.all(result)
    res.json(util.getReturnData(0, '', t_data))
  })
}