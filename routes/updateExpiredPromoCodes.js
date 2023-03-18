const express = require('express');
const router = express.Router();
const updateExpiredPromoCodes = require('../controllers/updateExpiredPromoCodes');

router.post('/', updateExpiredPromoCodes);

module.exports = router;
