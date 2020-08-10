var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db');
var pool = mysql.createPool( db.mysql );
/* GET users listing. */
    router.post('/', function(req, res, next) {
        console.log(req.body)
        if(req.body.nane==""){
            res.json({ err_code: 1, message: '名称不能为空',  })
            return
        }
        const sqlStr = 'INSERT INTO my(nane) VALUES(?)'
        var params = [req.body.nane];
        pool.query(sqlStr, params, (err, results) => {
           
            if (err) return res.json({ err_code: 1, message: mas,  })
            res.json({ err_code: 0, message: '添加成功',  })
        })
      });

module.exports = router;
