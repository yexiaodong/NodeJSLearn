var express = require('express');
var app = express();

//托管静态文件
app.use(express.static('public'));

//模板引擎
app.set('views','./views');//放模板文件的目录
app.set('view engine','jade');//使用模板引擎
app.get('/myTestJade',function (req,res) {
    res.render('myTestJade',{title:'模板引擎',message:'使用模板myTestJade.jade'});
})

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