var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')
/* GET users listing. */
router.get('/', function(req, res, next) {
 res.render('index');
});

router.post('/',indexController.newCandidate);

module.exports = router;
