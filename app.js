//express
const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
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
const List = require('./models/list');
//////////////////////////////
app.get('/', (req, res) => {
  List.find()
    .lean()
    .then((list) => res.render('index', { list }))
    .catch((error) => console.error(error));
});
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim();
  //大踩坑查了好久
  //https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  //https://stackoverflow.com/questions/26699885/how-can-i-use-a-regex-variable-in-a-query-for-mongodb
  List.find({ name: new RegExp(keyword, 'i') })
    .lean()
    .then((list) => res.render('index', { list, keyword }))
    .catch((error) => console.error(error));
});

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  return List.findById(id)
    .lean()
    .then((list) => res.render('detail', { list }))
    .catch((error) => console.log(error));
});

app.get('/new', (req, res) => {
  console.log('test');
  return res.render('new');
});
app.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  return List.findById(id)
    .lean()
    .then((list) => res.render('edit', { list }))
    .catch((error) => console.log(error));
});

app.post('/restaurants', (req, res) => {
  const reqBody = req.body;
  // res.send('sss')
  const list = new List({
    name:reqBody.name,
    name_en:reqBody.name_en,
    category:reqBody.category,
    image:reqBody.image,
    location:reqBody.location,
    phone:reqBody.phone,
    google_map:reqBody.google_map,
    rating:reqBody.rating,
    description:reqBody.description,
  });
  return list
    .save()
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error));
});
app.post('/:id/edit', (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  return List.findById(id)
    .then((list) => {
      list.name = reqBody.name;
      list.name_en = reqBody.name_en;
      list.category = reqBody.category;
      list.image = reqBody.image;
      list.location = reqBody.location;
      list.phone = reqBody.phone;
      list.google_map = reqBody.google_map;
      list.rating = reqBody.rating;
      list.description = reqBody.description;
      return list.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.error(error));
});

app.post('/:id/delete', (req, res) => {
  const id = req.params.id;
  return List.findById(id)
    .then((list) => list.remove())
    .then(() => res.redirect(`/`))
    .catch((error) => console.error(error));
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});