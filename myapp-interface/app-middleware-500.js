var express = require('express');
var app = express();

//托管静态文件
app.use(express.static('public'));

app.get('/error-500',function (req,res) {
    res.render('regular');//报错了，render没有支持
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

app.use(function (err,req,res,next) {
   console.log('抓到一个野生的500',err.stack);
    res.status(500).send('500了！');
});