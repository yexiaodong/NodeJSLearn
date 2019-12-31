var express = require('express')
const { auth } = require('../middleware/auth')
const { News } = require('../model')

var router = express.Router()

//新增新闻
router.post('/', auth, async (req, res) => {
    const news = await News.create({
        title: req.body.title,
        type: req.body.type,
        content: req.body.content
    })
    res.send({ data: '新增成功' })
})

//修改新闻
router.put('/:id', auth, async (req, res) => {
    const news = await News.findById(req.params.id)
    news.title = req.body.title
    news.type = req.body.type
    news.content = req.body.content
    await news.save()
    res.send({ data: news })
})

//修改新闻
router.delete('/:id', auth, async (req, res) => {
    const news = await News.findById(req.params.id)
    await news.remove()
    res.send({ data: '删除成功！' })
})

//查询新闻-列表
router.get('/', async (req, res) => {
    const news = await News.find()
    res.send({ data: news })
})

//查询新闻-详情
router.get('/:id', async (req, res) => {
    const news = await News.findById(req.params.id)
    res.send({ data: news })
})

module.exports = router