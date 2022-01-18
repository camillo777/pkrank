var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PK RANK' });
});

router.post('/', function(req,res){
  console.log(req.body);
  res.render('index', { 
    title: 'PK RANK', 
    tokenID: `${req.body.tokenID}`, 
    rank: 'RANKBOH'
  });
})

module.exports = router;
