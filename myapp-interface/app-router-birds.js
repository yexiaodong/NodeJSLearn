var express = require('express');
var router = express.Router();

//router：模块化
router.use(function timeLog(req,res,next) {//中间件
  console.log('Time',Date.now());
  next();
});
router.get('/',function (req,res) {
  res.send('鸟类模块-首页');
});
router.get('/about',function (req,res) {
  res.send('鸟类模块-about页面');
});

module.exports = router;



