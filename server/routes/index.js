var express = require('express');
var router = express.Router();
const { getNavMenu, getFooter, getLinks, getIndexPic, 
getHotArticle, getNewArticle, getArticle, getArticleTalk,
getArticles, viewArticle, getType1, getType2 } = require('../controller/getData')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getNavMenu', getNavMenu)  //获取菜单
router.get('/getFooter', getFooter)   //获取底部内容
router.get('/getLinks', getLinks)    //获取友情链接内容
router.get('/getIndexPic', getIndexPic)   //获取首页轮播内容
router.get('/getHotArticle', getHotArticle)  //获取热点文章内容
router.get('/getNewArticle', getNewArticle)  //获取新文章内容
router.get('/getArticle/:id', getArticle)  //获取新文章详情内容
router.get('/getArticleTalk/:id', getArticleTalk)  //获取新文章评论内容
router.post('/getArticles', getArticles)  //获取分类文章内容
router.post('/getType1/:id', getType1)  //根据一级分类获取文章内容
router.post('/getType2/:id1/:id2', getType2)  //根据二级分类获取文章内容
router.get('/viewArticle', viewArticle)  //文章查看数自动加1

module.exports = router;
