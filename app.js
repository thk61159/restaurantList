//////////import//////////
const express = require('express');
const { engine } = require('express-handlebars');
require('./config/mongoose')
//////////setting//////////
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
//static file
app.use(express.static('public'));



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
  const reqBody = req.body
  const list = new List({ ...req.body });
  return list
    .save()
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error));
});
app.post('/:id/edit', (req, res) => {
  const id = req.params.id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  return List.findById(id)
    .then((list) => {
      name = name;
      name_en = name_en;
      category = category;
      image = image;
      location = location;
      phone = phone;
      google_map = google_map;
      rating = rating;
      description = description;
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
