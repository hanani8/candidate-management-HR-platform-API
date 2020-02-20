var express = require('express');
var router = express.Router;
var indexController = require('../controllers/indexController');

router.get('/:id', indexController.dashboardData);

router.put('/:id',indexController.editAndSave);

router.get('/:id', indexController.auditTrail);

router.get('/:id',indexController.candidateMovement);

module.exports = router;