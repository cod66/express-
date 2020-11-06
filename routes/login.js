var express = require('express');
var router = express.Router();
const user = require("../sql/user");


router.get('/', function (req, res, next) {
    console.log('进入login');
    res.render('login')

});

router.post("/in", function (req, res, next) {
    console.log("进入login\in")
    let obj = req.body;
    console.log(obj, '这是obj');

    user.findOne(obj, (err, data) => {
        console.log("我开始查找了");
        if (err) {
            console.log(err);
        }
        if (data) {
            console.log('成功');
            /********确认守卫*******/
            //cookie操作
            //response  服务器和你说 你的肚子里面 cookie那个位置 给我村上islogin = ok
            //res.cookie('islogin','ok')
            //session 操作
            //注意 这里是req 设置的 实在服务器端设置的 因为要先分裂成一个对象 给前端一个 后端藏一个  前端通过给的那一个加密的来找信息
            req.session.islogin = 'ok';
            console.log(req.session.islogin, 'session状态');
            /********确认守卫*******/
            res.redirect("/");
        } else {
            console.log('不存在');
            res.redirect("/register")
        }

    })
})







module.exports = router;