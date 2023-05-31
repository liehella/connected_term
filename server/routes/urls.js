const express = require('express');
const router = express.Router();

const UrlsController = require('../controllers/urlsController');


/* GET home page. */
router.get('/', UrlsController.getUser);



module.exports = router;
