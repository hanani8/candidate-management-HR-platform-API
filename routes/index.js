var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

router.get('/', indexController.renderCandidates);

router.get('/',indexController.filterCandidates);

router.get('/',indexController.searchByAnything);

router.get('/',indexController.countBy);

module.exports = router;
