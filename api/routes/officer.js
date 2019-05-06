const express = require('express');
const router = express.Router();
const officerServices = require('../services/officer');


router.put('/', officerServices.addOfficer);
router.delete('/:id', officerServices.removeOfficer);


module.exports = router;
