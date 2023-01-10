const router = require('express').Router();

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
router.get('/sort', (req, res) => {
  const sortMethod = req.query.sortMethod;
  let sortRule;
  if (sortMethod === 'alphabet') {
    sortRule = { name_en: 1 };
  } else if (sortMethod === 'category') {
    sortRule = { category: 1 };
  } else if (sortMethod === 'region') {
    sortRule = { location: 1 };
  } else if (sortMethod === 'score') {
    sortRule = { rating: -1 };
  }
  List.find()
    .lean()
    .sort(sortRule)
    .then((list) => res.render('index', { list, sortMethod }))
    .catch((error) => console.error(error));
});

// // http://localhost:3000/newItem
// router.get('/newItem', (req, res) => {
//   const { schema } = List;
//   const { tree } = schema;
//   const title = Object.keys(tree).slice(0, 9);
//   console.log(tree);
//   return res.render('new', { title });
// });
module.exports = router;
