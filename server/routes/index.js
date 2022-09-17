var express = require('express');
var router = express.Router();
const { getNavMenu, getFooter } = require('../controller/getData')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getNavMenu', getNavMenu) //获取菜单
router.get('/getFooter', getFooter) //获取底部内容

module.exports = router;
