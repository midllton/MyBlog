const express = require('express')
const router = express.Router()

const { setNavMenu, setFooter } = require('../controller/admin')

router.post('/setFooter', setFooter)
router.post('/changeNav', setNavMenu)

module.exports = router