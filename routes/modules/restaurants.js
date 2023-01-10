const router = require('express').Router();
const List = require('../../models/list');

router.get('/newItem', (req, res) => {
  const { schema } = List;
  const { tree } = schema;
  const title = Object.keys(tree).slice(0, 9);
  console.log(tree);
  return res.render('new', { title });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return List.findById(id)
    .lean()
    .then((list) => res.render('detail', { list }))
    .catch((error) => console.log(error));
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  return List.findById(id)
    .lean()
    .then((list) => {
      const displayList = { ...list };
      delete displayList._id;
      delete displayList.__v;
      return res.render('edit', { list, displayList });
    })
    .catch((error) => console.log(error));
});

router.post('/', (req, res) => {
  const reqBody = req.body;
  const list = new List({ ...req.body });
  return list
    .save()
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  // const reqBody= req.body
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
      list.name = name;
      list.name_en = name_en;
      list.category = category;
      list.image = image;
      list.location = location;
      list.phone = phone;
      list.google_map = google_map;
      list.rating = rating;
      list.description = description;
      return list.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.error(error));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return List.findById(id)
    .then((list) => list.remove())
    .then(() => res.redirect(`/`))
    .catch((error) => console.error(error));
});

module.exports = router;
