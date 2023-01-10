const router = require('express').Router();

const home = require('./modules/home');
const list = require('./modules/restaurants');
const users = require('./modules/users')
router.use('/restaurants', list);
router.use('/users', users);
router.use('/', home);
module.exports = router;
