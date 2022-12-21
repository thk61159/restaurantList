const express = require('express');
const router = express.Router();

const List = require('../../models/list');
router.get('/', (req, res) => {
  List.find()
    .lean()
    .then((list) => res.render('index', { list }))
    .catch((error) => console.error(error));
});
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim();
  List.find({ name: new RegExp(keyword, 'i') })
    .lean()
    .then((list) => res.render('index', { list, keyword }))
    .catch((error) => console.error(error));
});

// http://localhost:3000/newItem
router.get('/newItem', (req, res) => {
  console.log('test');
  return res.render('new');
});
module.exports = router;
