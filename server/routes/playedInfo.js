const express = require('express');
const router = express.Router();

const playedInfoController = require('../controllers/playedInfoContorller');


/* GET home page. */
router.post('/', playedInfoController.postPlayedInfos);



module.exports = router;
