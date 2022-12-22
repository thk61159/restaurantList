const restaurantJson = require('../../restaurant.json');
const restaurantList = restaurantJson.results;
const List = require('../list'); // 載入 todo model
const db = require('../../config/mongoose');
db.once('open', () => {
  restaurantList.forEach((element) => {
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
    });
  });
  console.log('done');
});
