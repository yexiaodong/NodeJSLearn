var express = require('express');
var fs = require('fs');//文件系统
var app = express();

//托管静态文件
app.use(express.static('public'));

var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//优化-404处理
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

//route：
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

