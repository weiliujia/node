var express = require('express');
var router = express.Router();
var db = require("../db.js");
/* GET home page. */

router.post('/', function(req, res, next) {
  console.log(req.body,"body")
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({ uploadDir: './public/images' });
  form.parse(req, function(err, fields, files) {
      console.log(fields, files,' fields2')
      if (err) {
      } else {
          res.json({ imgSrc: files.image[0].path })
      }
  });
});
module.exports = router;
