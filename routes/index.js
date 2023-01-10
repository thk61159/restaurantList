const router = require('express').Router();

const home = require('./modules/home');
const list = require('./modules/restaurants');
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth'); // 掛載 middleware
router.use('/restaurants', authenticator,list);
router.use('/users', users);
router.use('/',authenticator, home);
module.exports = router;
