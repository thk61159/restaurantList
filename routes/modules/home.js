const router = require('express').Router();
const List = require('../../models/list');
router.get('/', (req, res) => {
  const userId = req.user._id;
  List.find({ userId })
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
  switch (sortMethod) {
    case 'alphabet':
      sortRule = { name_en: 1 };
      break
    case 'category':
      sortRule = { category: 1 };
      break
    case 'region':
      sortRule = { location: 1 };
      break
    case 'score':
      sortRule = { rating: -1 };
      break
  }
  List.find()
    .lean()
    .sort(sortRule)
    .then((list) => res.render('index', { list, sortMethod }))
    .catch((error) => console.error(error));
});


module.exports = router;
