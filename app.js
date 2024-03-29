//////////import//////////
const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const routes = require('./routes');
const session = require('express-session')
const usePassport = require('./config/passport')// 載入設定檔，要寫在 express-session 以後
require('./config/mongoose');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


//////////setting//////////
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

usePassport(app);
app.use((req, res, next) => {
  let msgs = req.session.messages || []
  res.locals.messages = msgs
	res.locals.hasMessages = !!msgs.length
	req.session.messages = []
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.user = req.user;
  next();
});
//////////controller//////////
app.use(routes);

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
