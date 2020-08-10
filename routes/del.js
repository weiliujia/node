var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db');
var pool = mysql.createPool(db.mysql);
router.post('/', function (req, res, next) {
    console.log(req.body)
    //删除数据
    var delsql = `DELETE FROM my WHERE id = ${req.body.id}`;
    pool.query(delsql, function (err, result) {
        if (err) return res.json({ code: 0, message: err, affectedRows: 0 })
        res.json({ code: 1, message: '操作成功', })

    });
});
module.exports = router;
