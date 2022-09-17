let redis = require('redis')

const { redisConfig } = require('../config/db') //获取数据库的配置

let redisClient = redis.createClient(redisConfig) //获取redis连接
//await redisClient.connect()

redisClient.on('connect', () => {
  console.log('连接成功')
}) //连接成功

redisClient.on('error', err => {
  console.log('连接错误：' + err)
})  //错误处理

redis = {}

// 根据模式获取全部键
let keys = async (cursor, re, count) => {
  let getTempKeys = await new Promise((resolve) => {
    // 从连接中获取该值并返回
    redisClient.scan([cursor, 'MATCH', re, 'COUNT', count], (err, res) => {
      console.log('获取key错误:' + err)
      console.log(res)
      return resolve(res)
    })
  })
  return getTempKeys
}

redis.scan = async (re, cursor = 0, count = 100) => {
  return await keys(cursor, re, count)
}

// 设置该值进入数据库
redis.set = (key, value) => {
  // 将所有对象转换为JSON字符串进行保存，需要注意的是：如果该字符串过大，可能会导致性能下降
  value = JSON.stringify(value)
  return redisClient.set(key, value, (err) => {
    if(err) {
      console.log('值进入数据库错误：' + err)
    }
  })
}

// 获取text，在获取时可以使用then调用
let text = async (key) => {
  let getTempValue = await new Promise((resolve) => {
    // 从连接中获取该值并返回
    redisClient.get(key, (err, res) => {
      if(err) {
        console.log('获取text错误：' + err)
      }
      return resolve(res)
    })
  })
  getTempValue = JSON.parse(getTempValue) // 将该值转回对象
  return getTempValue
}

// 返回获取的值
redis.get = async (key) => {
  return await text(key)
}

// 设置key的过期时间
redis.expire = (key, ttl) => {
  redisClient.expire(key, parseInt(ttl))
}

// 获取自增id
let id = async (key) => {
  console.log('查找' + key)
  let id = await new Promise((resolve => {
    redisClient.incr(key, (err, res) => {
      console.log(res)
      return resolve(res)
    })
  }))
  console.log(id)
  return id
}

redis.incr = async (key) => {
  return await id(key)
}

// 在某些情况下会使用到Redis中的有序集合这个结构，例如在文章的阅读数量和热点获取时需要排序。
// 有序集合结构基于k-v基础，v中有一个member对象，对应一个score（分值），通过score可实现排序
redis.zadd = (key, member, num) => {
  member = JSON.stringify(member)
  redisClient.zadd(key, num, member, err => {
    if (err) {
      console.log('有序集合错误：' + err)
    }
  })
}

// 获取一定范围内的元素
let tempData = async (key, min, max) => {
  let tData = await new Promise((resolve => {
    redisClient.zrevrange([key, min, max, 'WITHSCORES'], (err, res) => {
      return resolve(res)
    })
  }))
  // 同时获取分值，需要转换为对象
  let oData = []
  for (let i = 0; i < tData.length; i = i + 2) {
    oData.push({member: JSON.parse(tData[i]), score: tData[i + 1]})
  }
  return oData
}

redis.zrevrange = async (key, min = 0, max = -1) => {
  return tempData(key, min, max)
}

// 有序集合的自增操作
redis.zincrby = (key, member, NUM = 1) => {
  member = JSON.stringify(member)
  redisClient.zincrby(key, NUM, member, err => {
    if (err) {
      console.log('有序集合自增操作错误：' + err)
    }
  })
}

// 有序集合通过member获取其score值
tempZscore = async (key, member) => {
  member = JSON.stringify(member)
  return await new Promise((resolve => {
    redisClient.zscore(key, member, (err, res) => {
      console.log('有序集合通过member获取其score值错误：' + err)
      return resolve(res)
    })
  }))
}

redis.zscore = async (key, member) => {
  return tempZscore(key, member)
}

module.exports = redis

