var express = require('express');
var router = express.Router();
const user = require("../sql/user");

module.exports = router;
router.get('/', function (req, res, next) {
    console.log('进入register');
    res.render('register');

});
router.post("/in", function (req, res, next) {
    console.log("进入register 的in 处理");

    let obj = req.body;
    console.log(obj)
    console.log(obj.username);
    console.log(obj.password)
    user.findOne(obj, (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
        }
        if (data) {
            console.log('用户名存在');

            res.redirect('/register')
        } else {
            console.log('用户名不存在');
            user.insertMany(obj, (err, data) => {
                if (err) {
                    console.log(err)
                }
                console.log(data)

                if (data) {
                    res.redirect('/login')
                } else {
                    res.redirect('/register')
                }

            })
        }
    })




});
module.exports = router;