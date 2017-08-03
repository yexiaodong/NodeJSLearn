var express = require('express');
var app = express();
var router = express.Router();

//托管静态文件
app.use(express.static('public'));

/*
 说明：
 1./user/id ：普通中间件的使用；
 2./user ：一组中间件的使用；
 3./username/:id ：终止请求-响应循环；
 4./book/:id ：跳过剩余中间件；
 5./school/:id ：路由级中间件；
 */

//中间件
//没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req,res,next) {
    console.log('没有挂载路径的中间件，Time',Date.now());
    next();
});
//挂载至 /user/:id的中间件，任何指向/user/:id的请求都会执行它
app.use('/user/:id',function (req,res,next) {
    console.log('Request Type:',req.method);
    next();
});

//一组中间件
app.use('/user',function (req,res,next) {
    console.log('一组中间件1，Request URL：',req.originalUrl);
    next();
},function (req,res,next) {
    console.log('一组中间件2，Request Type：',req.method);
    next();
});

//路由和句柄函数（中间件系统），处理指向/user/:id的Get请求
app.get('/user/:id',function (req,res,next) {
    res.send('user');
});
//路由和句柄函数（中间件系统），处理指向/user的Get请求
app.get('/user', function (req, res) {
    res.send('Got a get request at /user');
});

//终止请求-响应循环，也可为app.get
app.use('/username/:id',function (req,res,next) {
    console.log('id：',req.params.id);
    next();
},function (req,res,next) {
    res.send('终止了请求-响应循环,id:' + req.params.id);
});
app.get('/username/:id',function (req,res,next) {//不被执行
    res.send('不被执行,id:' + req.params.id);
    req.end(req.params.id);
});

//调高剩余中间件
app.get('/book/:id',function (req,res,next) {
    if(req.params.id == 0) next('route');
    else next();
},function (req,res,next) {
    res.send('参数不为0，不跳过剩余中间件');

});
app.get('/book/:id',function (req,res,next) {
    res.send('参数为0，跳过剩余中间件');
});

//路由级中间件
router.get('/school/:id',function(req,res,next){
    console.log('路由级中间件，id:',req.params.id);
    next();
},function (req,res,next) {
    res.send('路由级中间件');
});
app.use('/',router);//将路由挂载到应用

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