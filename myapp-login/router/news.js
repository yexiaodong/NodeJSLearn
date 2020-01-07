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

//删除新闻
router.delete('/:id', auth, async (req, res) => {
    const news = await News.findById(req.params.id)
    await news.remove()
    res.send({ data: '删除成功！' })
})

//查询新闻-列表
router.get('/', async (req, res) => {
    //sort：排序,-1为倒序，1为正序
    //const news = await News.find().sort({title:-1})

    //where：查询条件
    // const news = await News.find().where({type:'css类'})//精确
    // const news = await News.find().where({type:/css/})//模糊 /:类似sql的%，同时移除引号

    //分页 skip：跳过  limit：查询数量
    const news = await News.find().skip(1).limit(2)

    res.send({ data: news })
})

//查询新闻-详情
router.get('/:id', async (req, res) => {
    const news = await News.findById(req.params.id)
    res.send({ data: news })
})

module.exports = router