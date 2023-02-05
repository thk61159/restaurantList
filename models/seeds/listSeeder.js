const restaurantJson = require('../../restaurant.json')
const restaurantList = restaurantJson.results
const List = require('../list')
const User = require('../user')
// const { List, User } = require('../../models')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const SEED_USER = [
	{
		name: 'user1',
		email: 'user1@example.com',
		password: '12345678',
		restaurantList: restaurantList.slice(0, 3),
	},
	{
		name: 'user2',
		email: 'user2@example.com',
		password: '12345678',
		restaurantList: restaurantList.slice(3, 6),
	},
]
db.once('open', () => {
	Promise.all(
		SEED_USER.map(user => {
			bcrypt
				.genSalt(10)
				.then(salt => bcrypt.hash(user.password, salt))
				.then(hash =>
					User.create({
						name: user.name,
						email: user.email,
						password: hash,
					})
				)
				.then(user => {
					const userId = user._id
					return Promise.all(
						restaurantList.map(element => {
							return List.create({
								name: element.name,
								name_en: element.name_en,
								category: element.category,
								image: element.image,
								location: element.location,
								phone: element.phone,
								google_map: element.google_map,
								rating: element.rating,
								description: element.description,
								userId,
							})
						})
					).then(() => {
						console.log('done.')
						process.exit()
					})
				})
		})
	)
})
