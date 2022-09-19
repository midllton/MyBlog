const express = require('express')
const router = express.Router()

const { articleTalk } = require('../controller/userNeedCheck')
router.post('/article/talk', articleTalk)

module.exports = router