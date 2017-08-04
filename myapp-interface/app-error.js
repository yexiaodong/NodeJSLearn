var express = require('express');
var app = express();

//托管静态文件
app.use(express.static('public'));

app.get('/testError',function checkIfPaidSubscriber(req,res,next) {
    if(!req.user.hasPaid){
        next('route');
    }
},function getPaidContent(req,res,next) {
    PaidContent.find(function (err,doc) {
        if(err) return next(err);
        res.json(doc);
    });
})

//将请求和错误信息写入标准错误输出、日志或类似服务
function logErrors(err,req,res,next) {
    console.error('有错误啦：',err.stack);
    next(err);
}
function clientErrorHandler(err,req,res,next) {
    if(req.xhr){//Ajax请求
        res.status(500).send({ error: 'Ajax请求，服务器错误！！！' });
    }else{
        next(err);
    }
}
function errorHandler(err,req,res,next) {
    res.status(500);
    res.send('500错误 :'+ err );
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//监听3002
var server = app.listen(3002, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


