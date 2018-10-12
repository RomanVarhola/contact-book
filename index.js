const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const router = require('./routes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret
}));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

mongoose
  .connect('mongodb://localhost:27017/contactBook', {useNewUrlParser: true})
  .then(() => {
      console.log('Connected to mongoDB');
    },
  )
  .catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running.${err}`);
    process.exit();
  });

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(router);

app.listen(config.port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Server is listening on ${config.port}`);
});
