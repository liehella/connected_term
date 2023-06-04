const express = require('express');
const router = express.Router();

const analysisController = require('../controllers/analysisController');


/* GET home page. */
router.get('/count', analysisController.getCount);
router.get('/resolution',analysisController.getResolution)



module.exports = router;
