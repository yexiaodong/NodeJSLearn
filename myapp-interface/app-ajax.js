var express = require('express');
var app = express();

//托管静态文件
app.use(express.static('public'));

//跨域
//get请求
app.get('/user', function (req, res) {
    res.send({data:'Got a get request at /'});
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