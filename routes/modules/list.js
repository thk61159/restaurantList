const express = require('express');
const router = express.Router();

const List = require('../../models/list');


router.get('/:id', (req, res) => {
  const id = req.params.id;
  return List.findById(id)
    .lean()
    .then((list) => res.render('detail', { list }))
    .catch((error) => console.log(error));
});

//localhost:3000/lists/newItem
router.get('/newItem', (req, res) => {
  console.log('test');
  return res.render('new');
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  return List.findById(id)
    .lean()
    .then((list) => res.render('edit', { list }))
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
    .then(() => res.redirect(`/lists/${id}`))
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
