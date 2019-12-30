var express = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('./model')
const { SECRET } = require('./tools/config')
const { auth } = require('./middleware/auth')
//引入各个模块的路由处理（即接口）
const user = require('./router/user')

var app = express()
app.use(express.json()) //开启json解析，.http文件的最后一个post参数不可带“,”，否则解析错误


app.get('/', function (req, res) {
  res.send({ data: 'Got a get request at /' })
})
//注册
app.post('/register', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  })
  res.send({ data: user })
})
//登陆
app.post('/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  })
  if (!user) {
    return res.status(422).send({ data: {}, message: '用户不存在！' })
  }
  const isPasswordValid = require('bcryptjs').compareSync(req.body.password, user.password)
  if (!isPasswordValid) {
    return res.status(422).send({ data: {}, message: '密码无效！' })
  }
  //生成token 第一个参数可以是对象，也可以是字符串
  const token = jwt.sign({
    id: String(user._id)
  }, SECRET)
  res.send({ data: { user, token: token } })
})

//使用各个模块的路由处理
app.use('/user', user)


var server = app.listen(3002, function () {
  console.log('http://localhost:3002');
});