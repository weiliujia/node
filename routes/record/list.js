var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../../db');
var pool = mysql.createPool( db.mysql );
/* GET users listing. */
router.get('/', function(req, res, next) {
  const sqlStr = 'select * from recordlist'
  pool.query(sqlStr, (err, results) => {
      if (err) return res.json({ ecode: 0, msg: '信息不存在', affextedRows: 0 })
      res.json({ code: 200, msg:"success",data: results, affextedRows: results.affextedRows })
  })
});

module.exports = router;
