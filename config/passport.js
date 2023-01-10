const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email }).then((user) => {
        console.log(user);
        if (!user) {
          return done(null, false);
        } else {
          return bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
              if (!isMatch) {
                console.log('falsefalse');
                return done(null, false);
              }
              return done(null, user);
            })
            .catch((err) => done(err, false));
        }
        
      });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
