const express = require('express');
const router = express.Router();
const bikeServices = require('../services/cases');


router.get('/', bikeServices.getCases);
router.put('/', bikeServices.addCase);
router.patch('/:caseid', bikeServices.closeCase);


module.exports = router;
