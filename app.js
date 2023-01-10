//////////import//////////
const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const routes = require('./routes');
require('./config/mongoose');

//////////setting//////////
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(methodOverride('_method'));
//////////controller//////////
app.use(routes);
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
