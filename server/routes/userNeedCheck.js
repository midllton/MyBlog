const express = require('express')
const router = express.Router()

const { articleTalk, getUserInfo, changeUserInfo, sendMail, getMails, getUserMail,
getArticleType, articleLike, articleCollection, getCollection } = require('../controller/userNeedCheck')

router.post('/article/talk', articleTalk)
router.get('/info/:username', getUserInfo)  // 获取用户资料
router.post('/changeInfo', changeUserInfo)  // 更改用户资料
router.post('/mail/:username', sendMail)  // 发送私信
router.get('/getMails', getMails)  // 获取私信列表
router.get('/getMails/:id', getUserMail)  // 获取私信
router.get('/getArticleType', getArticleType)  // 获取文章分类列表
router.get('/like/:id/:like', articleLike)  // 文章点赞和踩
router.get('/save/:id', articleCollection)  // 文章收藏
router.get('/saveList', getArticleType)  // 获取收藏列表

module.exports = router