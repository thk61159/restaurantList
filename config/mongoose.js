//環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
//database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
//資料庫連線狀態
const db = mongoose.connection;
db.on('error', () => {
  console.log('mongodb error!');
});
db.once('open', () => {
  console.log('mongodb connected!');
  mongoose.set('debug', true);//查看操作
});

module.exports = db;
