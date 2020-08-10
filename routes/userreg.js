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
        res.json({ code: 0, msg: "请设置密码" })
        return
    }
    const sqlStr = `select * from user WHERE phone=${req.body.phone}`
    pool.query(sqlStr, (err, data) => {
        if (data.length == 0) {
            //创建
            var user = [req.body.phone, req.body.code]
            var sql = `INSERT INTO user(phone,code) VALUES(?,?)`;
            pool.query(sql, user, function (err, result) {
                if (err) return res.json({ code: 0, msg: err, })
                res.json({
                    code: 1,
                    msg: '创建成功',
                    data: { id: result.insertId }
                })
            })
        } else {
            res.json({ code: 0, msg: "用户已存在" })

        }
    })
});
module.exports = router;
