//import express
const express = require('express')
const app = express()
// test port:3000
const port = 3000
//import restaurantList
const restaurantList = require('./restaurant.json')
//import handlebars see handlebars instuction
const { engine } = require("express-handlebars");
// express template exphbs.engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
//import static css here is bootstrap
app.use(express.static("public"));


app.get('/', (req, res) => {
  console.log(restaurantList);
  res.render("index", { restaurantList: restaurantList.results });
})
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  console.log(keyword);
  const searchedRestaurant = restaurantList.results.filter((e) =>
    e.name.toLowerCase().includes(keyword.toLowerCase())
  );
  res.render("index", { restaurantList: searchedRestaurant, keyword: keyword });
});
app.get("/restaurants/:id", (req, res) => {
  const showRestaurant = restaurantList.results.find(
    (e) => e.id.toString() === req.params.id
  );
  res.render("show", { showRestaurant: showRestaurant });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});