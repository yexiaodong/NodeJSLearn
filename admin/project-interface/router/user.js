//用户类的接口
var express = require('express')
var db = require('../tools/db.js')
var router = express.Router()

router.get('/', function (req, res){
    res.send({ data: '获取单个用户' })
})

router.get('/list', async (req, res)=>{
    let data = await db.query('select * from sys_user')
    res.send({ data: data })
})

module.exports = router