//用户类的接口
var express = require('express')
var bodyParser = require('body-parser');
var jwt = require('express-jwt')
var db = require('../tools/db.js')
var router = express.Router()
router.use(bodyParser.json());


//登陆
router.get('/login', function (req, res){
    const token = 'Bearer ' + jwt.toString({
        id:123,
        admin: true
    },'sert123',{expiresIn: 3600 * 24 * 3})
    res.send({ data: token })
})

router.get('/', function (req, res){
    res.send({ data: '获取单个用户' })
})

router.get('/list', async (req, res)=>{
    let data = await db.query('select * from sys_user')
    res.send({ data: data })
})

router.post('/add', async (req, res)=>{
    let data = await db.query('select * from sys_user')
    console.log('名称：',req.param('name'),req.body)
    res.send({ data: '添加' })
})

module.exports = router