// nodejs 有两种导出方式：1. const obj = { age:18 } module.exports = obj   2. exports.obj = { age:18 } 
exports.redisConfig = { host: '127.0.0.1', port: '6379', ttl: 5 * 60 * 1000} // ttl:time to live，key的生存时间