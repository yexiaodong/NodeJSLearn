var express = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('./model')
const SECRET = 'ASDFASDFAS'//类似密钥，尽量不要上传到代码中，不要泄露！！！！

var app = express()
app.use(express.json()) //开启json解析，.http文件的最后一个post参数不可带“,”，否则解析错误

//中间件
const auth = async (req, res, next) => {
  /*
   1.移除为了规范而加上的 Beaer和空格
   2.String：转换字符串，确保authorization是字符串类型
 */
  const raw = String(req.headers.authorization).split(' ').pop()
  const token = jwt.verify(raw, SECRET)
  req.user = await User.findById(token.id)
  next()
}

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
//查询所有用户
app.get('/users', async (req, res) => {
  const user = await User.find()
  res.send({ data: user })
})
//查询某个用户
app.get('/profile',auth, async (req, res) => {
  res.send({ data: req.user })
})



var server = app.listen(3002, function () {
  console.log('http://localhost:3002');
});