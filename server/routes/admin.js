const express = require('express')
const router = express.Router()

const { setNavMenu, setFooter, setLinks, setIndexPic, setArticle } = require('../controller/admin')

router.post('/changeNav', setNavMenu)
router.post('/setFooter', setFooter)
router.post('/setLinks', setLinks)
router.post('/setIndexPic', setIndexPic)
router.post('/setArticle', setArticle)

module.exports = router