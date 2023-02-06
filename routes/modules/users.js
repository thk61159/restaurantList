const router = require('express').Router();
const User = require('../../models/user');
const passport = require('passport'); //POST login authenticator
const bcrypt = require('bcryptjs'); //POST register hash password

router.get('/login', (req, res) => {
  res.render('login');
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureMessage: true
  })
);
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  User.findOne({ email })
    .then((e) => {
      if (e) {
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          note: 'email has been registed!!'
        });
      } else {
        return bcrypt
          .genSalt(8)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) =>
            User.create({
              name,
              email,
              password: hash,
            })
          )
          .then(() => res.redirect('/users/login'))
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
});

router.get('/logout', (req, res) => {
  //Error: req#logout requires a callback function search stackoverflow
  req.logout(req.user, (err) => {
    if (err) return next(err);
    req.session.messages = '已登出'
    res.redirect('/users/login');
  });
});
module.exports = router;
