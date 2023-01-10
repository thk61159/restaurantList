const router = require('express').Router();
const User = require('../../models/user');

router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password })
    .lean()
    .then((e) => res.send('hello'))
    .catch((e) => console.log(e));
});
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((e) => {
      console.log(e)
      if (e) {
        res.locals.note = 'email has been registed!!';
        return res.render('register', { name, email, password});
      } else {
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect('/'))
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
});

module.exports = router;
