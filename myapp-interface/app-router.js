var express = require('express');
var fs = require('fs');//文件系统
var app = express();
var router = express.Router();
var birds = require('./app-router-birds');//加载路由模块
app.use('/birds',birds);

//托管静态文件
app.use(express.static('public'));

//route：新增、修改、删除、查询
//注意必须在listen方法之前，否则无效
app.route('/book')
    .get(function(req, res) {
      res.send({data:'get a random book'});
    })
    .post(function(req, res) {
      res.send({data:'add a book'});
    })
    .put(function(req, res) {
      res.send({data:'update the book'});
    });

//监听3002
var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//优化-404处理
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


