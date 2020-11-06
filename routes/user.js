var express = require('express');
var router = express.Router();
const user = require("../sql/user");
/* GET home page. */
router.get('/', function (req, res, next) {

  user.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)

    res.render("usera", {
      index: 2,
      data: data
    })
  })


});


router.get('/add', function (req, res, next) {
  res.render('userAdd', {
    index: 2
  });
});


router.post("/addAction", function (req, res, next) {
  console.log('进入user addAction')

  let obj = req.body;
  console.log(obj);

  user.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })

  // production.insertMany(obj,(err,data)=>{
  //      if(err) {
  //        console.log(err)
  //      } 
  //      console.log(data)
  //      res.redirect("/pro");
  // })



});

//删除
router.get("/delete", function (req, res, next) {
  console.log('我进入user删除');
  console.log(req.query);
  user.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.redirect("/user")
  })
})
//修改 
router.get("/update", function (req, res, next) {
  console.log(req.query);
  //id
  const _id = req.query._id;
  console.log("_id", _id);
  user.findById({ _id: _id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("我现在到了/user   update修改数据路由");
    console.log(data._id);
    res.render('userUpdate', {
      index: 2,
      data: data,
    });
  });
});
//修改后更新
router.post(
  "/UpdateAction", function (req, res, next) {
    console.log('我在UpdateAction');
    const obj = req.body;
    console.log(obj);
    user.findByIdAndUpdate(obj._id, obj, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/user');
    });
  });
router.get("/search", (req, res, next) => {
  console.log("我是user里面的查询");
  const obj = req.query;
  console.log(obj);
  let reg = new RegExp(obj.search);

  user.find({ username: reg }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.render("usera", {
      index: 1,
      data,
    });
  });
});
module.exports = router;
