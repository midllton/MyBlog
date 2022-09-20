const express = require('express')
const router = express.Router()

const { setNavMenu, setFooter, setLinks, setIndexPic, setArticle, setArticleType,
showArticle, getAllUser, stopLogin } = require('../controller/admin')

router.post('/changeNav', setNavMenu)
router.post('/setFooter', setFooter)
router.post('/setLinks', setLinks)
router.post('/setIndexPic', setIndexPic)
router.post('/setArticle', setArticle)
router.post('/setArticleType', setArticleType)
router.post('/showArticle', showArticle)
router.get('/getAllUser', getAllUser)
router.get('/stopLogin/:username', stopLogin)

module.exports = router