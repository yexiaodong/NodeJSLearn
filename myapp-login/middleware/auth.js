const jwt = require('jsonwebtoken')
const { User } = require('../model')
const { SECRET } = require('../tools/config')

//中间件-登陆验证  名称规则：首字母小写的驼峰命名法
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

  module.exports = { auth }
  