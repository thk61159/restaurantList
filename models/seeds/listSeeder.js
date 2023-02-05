const restaurantJson = require('../../restaurant.json')
const restaurantList = restaurantJson.results.slice(
	0,
	Math.floor(Math.random() * 8 + 1)
)
console.log(restaurantList)
const List = require('../list')
const User = require('../user')
// const { List, User } = require('../../models')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const SEED_USER = {
	name: 'root',
	email: 'root@example.com',
	password: '12345678',
}
db.once('open', () => {
	bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(SEED_USER.password, salt))
		.then(hash =>
			User.create({
				name: SEED_USER.name,
				email: SEED_USER.email,
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
