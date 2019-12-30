var express = require('express')
const { auth } = require('../middleware/auth')
const { User } = require('../model')

var router = express.Router()

//查询所有用户
router.get('/list', async (req, res) => {
    const user = await User.find()
    res.send({ data: user })
})

//查询某个用户
router.get('/profile', auth, async (req, res) => {
    res.send({ data: req.user })
})

module.exports = router