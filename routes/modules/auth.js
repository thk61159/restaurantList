const router = require('express').Router();

const passport = require('passport');

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'], //想與fb要的資料
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureMessage:true
  })
);
module.exports = router;
