var express = require('express');
var router = express.Router();
const { getNavMenu, getFooter, getLinks, getIndexPic, getHotArticle } = require('../controller/getData')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getNavMenu', getNavMenu) //获取菜单
router.get('/getFooter', getFooter) //获取底部内容
router.get('/getLinks', getLinks) //获取友情链接内容
router.get('/getIndexPic', getIndexPic) //获取首页轮播内容
router.get('/getHotArticle', getHotArticle) //获取首页轮播内容

module.exports = router;
