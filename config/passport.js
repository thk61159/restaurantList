const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

module.exports = app => {
	app.use(passport.initialize())
	app.use(passport.session())
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			User.findOne({ email }).then(user => {
				console.log(user)
				if (!user) {
					return done(null, false, { message: '錯誤帳號或密碼' })
				} else {
					return bcrypt
						.compare(password, user.password)
						.then(isMatch => {
							if (!isMatch) {
								console.log('falsefalse')
								return done(null, false, { message: '錯誤帳號或密碼' })
							}
							return done(null, user)
						})
						.catch(err => done(err, false))
				}
			})
		})
	)
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: process.env.FACEBOOK_CALLBACK,
				profileFields: ['email', 'displayName'],
			},
			function (accessToken, refreshToken, profile, done) {
				const { name, email } = profile._json
				User.findOne({ email }).then(user => {
					if (user) return done(null, user)
					const randomPassword = Math.random().toString(36).slice(-8)
					bcrypt
						.genSalt(10)
						.then(salt => bcrypt.hash(randomPassword, salt))
						.then(hash =>
							User.create({
								name,
								email,
								password: hash,
							})
						)
						.then(user => done(null, user))
						.catch(e => done(e, false))
				})
			}
		)
	)
	passport.serializeUser((user, done) => {
		done(null, user.id)
	})
	passport.deserializeUser((id, done) => {
		User.findById(id)
			.lean()
			.then(user => done(null, user))
			.catch(err => done(err, null))
	})
}
