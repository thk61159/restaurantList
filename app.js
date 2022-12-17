//express
const express = require('express');
const app = express();
const port = 3000;
//template engine
const { engine } = require('express-handlebars');
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
//static file
app.use(express.static('public'));
//環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
//database
const mongoose = require('mongoose'); 
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 
//資料庫連線狀態
const db = mongoose.connection;
db.on('error', () => {
  console.log('mongodb error!');
});
db.once('open', () => {
  console.log('mongodb connected!');
});
const List = require('./models/list')
comsole.log(List)
//////////////////////////////
app.get('/', (req, res) => {
  List.find()
    .lean()
    .then((list) => res.render('index', { list }))
    .catch((error) => console.error(error));
});
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  console.log(keyword);
 
  const searchedRestaurant = restaurantList.results.filter((e) =>
    e.name.toLowerCase().includes(keyword.toLowerCase())
  );
  res.render('index', { restaurantList: searchedRestaurant, keyword: keyword });
});
app.get('/restaurants/:id', (req, res) => {
  const showRestaurant = restaurantList.results.find(
    (e) => e.id.toString() === req.params.id
  );
  res.render('show', { showRestaurant: showRestaurant });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
