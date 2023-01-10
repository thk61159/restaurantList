const router = require('express').Router();
const User = require('../../models/user');
const passport = require('passport'); //POST login authenticator
const bcrypt = require('bcryptjs');; //POST register hash password

router.get('/login', (req, res) => {
  res.render('login');
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
);
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((e) => {
      console.log(e);
      if (e) {
        res.locals.note = 'email has been registed!!';
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
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
          .then(() => res.redirect('/'))
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
});

module.exports = router;
