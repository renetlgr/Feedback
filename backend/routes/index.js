const express = require('express');
const router = express.Router();
const feedbacks = require('./feedbacks');

router.use('/feedbacks', feedbacks);

module.exports = router;
