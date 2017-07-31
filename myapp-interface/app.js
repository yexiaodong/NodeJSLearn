var express = require('express');
var fs = require('fs');//文件系统
var app = express();

//托管静态文件
app.use(express.static('public'));
//app.use('/html', express.static('public')); //虚拟目录

//get请求
app.get('/', function (req, res) {
  res.send({data:'Got a get request at /'});
});
app.get('/user', function (req, res) {
  res.send({data:'Got a get request at /user'});
});
app.get('/fs',function(req,res){
  //读取json文件
  fs.readFile('json/test.json',function(err,data){
    if(err){
      res.send(err);
      return console.error(err);
    }
    res.send(data);
    console.log('异步读取',data.toString());//在命令行输出
  })
});


//post请求
app.post('/',function(req,res){
  res.send({data:'Got a post request at /'});
});

app.post('/user',function(req,res){
  res.send({data:'Got a post request at /user'});
});

// user 节点接受put请求
app.put('/user',function(req,res){
  res.send({data:'Got a put request at /user'});
});

//user节点接受一个delete请求
app.delete('/user',function(req,res){
  res.send('Got a Delete request at /user');
});

//表单
app.post('/form',function (req,res) {
  console.log('post-表单提交');
  res.send({data:'表单提交成功'});
});
app.get('/form',function (req,res) {
  console.log('get-表单提交');
  res.send({data:'表单get提交，参数'+ req.query.username})
})

var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//优化-404处理
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
