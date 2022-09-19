var express = require('express');
var router = express.Router();

const { userLogin, userRegister } = require('../controller/user')
const { checkUser } = require('../util/middleware')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', userLogin)
router.post('/register', userRegister)
router.use('/user', checkUser, require('./userNeedCheck'))


module.exports = router;
