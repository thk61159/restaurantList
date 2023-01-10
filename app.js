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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

usePassport(app);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.user = req.user;
  // res.locals.success_msg = req.flash('success_msg'); // 設定 success_msg 訊息
  // res.locals.warning_msg = req.flash('warning_msg'); // 設定 warning_msg 訊息
  next();
});
//////////controller//////////
app.use(routes);
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
