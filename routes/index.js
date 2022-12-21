const express = require('express');
const router = express.Router();

const home = require('./modules/home');
router.use('/', home);
const list = require('./modules/list');
router.use('/lists', list);

module.exports = router;
