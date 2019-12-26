var express = require('express')
var expressJwt = require('express-jwt')

//引入各个模块的接口
const user = require('./router/user')

var app = express()
// app.use(expressJwt({
//     secret: 'sert123' //签名的密钥 或 publickey
// }).unless({
//     path: ['/user/login']//指定路径不经过 Token 解析
// }))


app.get('/', function (req, res) {
    res.send({ data: 'Got a get request at /' })
})

app.use('/user', user)


var server = app.listen(3002, function () {
    var host = server.address().address;
    var port = server.address().port;

    //console.log('Example app listening at http://%s:%s', host, port);
});