var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db');
var pool = mysql.createPool(db.mysql);
router.post('/', function (req, res, next) {
    //查用户是否存在
    if (req.body.phone == "") {
        res.json({ code: 0, msg: "请填写手机号" })
        return
    }
    if (req.body.code == "") {
        res.json({ code: 0, msg: "请输入密码" })
        return
    }
    const sqlStr = `select * from user WHERE phone=${req.body.phone}`
    pool.query(sqlStr, (err, data) => {
        console.log(data)
        if (data.length == 0) {
            //创建
            res.json({ code: 0, msg: "用户不存在" })
        } else {
            if(data[0].phone!=req.body.phone){
                res.json({ code: 0, msg: "账号不正确" })
             return   
            }
            if(data[0].code!=req.body.code){
                res.json({ code: 0, msg: "密码不正确" })
             return   
            }
            res.json({ code: 1, msg: "success" })
        }
    })
});
module.exports = router;