const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { checkApp } = require('./util/middleware')

// 引入路由
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

// 创建实例
const app = express();

// 设置允许跨域访问
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', checkApp, indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter)

module.exports = app;
