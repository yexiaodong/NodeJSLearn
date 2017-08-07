var express = require('express');
var app = express();

//托管静态文件
app.use(express.static('public'));

//中间件
//没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req,res,next) {
    console.log('没有挂载路径的中间件，Time',Date.now());
    next();
});


//监听3002
var server = app.listen(3002, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


//优化-404处理 注意必须放最后
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});