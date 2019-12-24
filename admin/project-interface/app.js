var express = require('express')
//引入各个模块的接口
const user = require('./router/user')

var app = express()
app.get('/', function (req, res){
    res.send({ data: 'Got a get request at /' })
})

app.use('/user',user)


var server = app.listen(3002, function () {
    var host = server.address().address;
    var port = server.address().port;

    //console.log('Example app listening at http://%s:%s', host, port);
});