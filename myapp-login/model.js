const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express-login',{
    useUnifiedTopology: true,
    useCreateIndex:true,
    useNewUrlParser: true,//新的解析器，如果不加上这个运行会报错
})

const UserSchema = new mongoose.Schema({
    username:{type:String,unique:true},//unique：字段是否唯一。PS：若表的字段已有重复的，该功能不生效，必须删除重复数据
    password:{type:String,set(val){
        //密码保存时，加密
        return require('bcryptjs').hashSync(val,10)//同步的散列方法：加密密码，每次加密的结果都不一致。参数2：加密强度，建议：10
    }},
})
const User = mongoose.model('User',UserSchema)
// User.db.dropCollection('users')
module.exports = { User,}