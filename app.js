var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db_uri = require('./config/key').db_uri;
const port = 3000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');

var app = express();

// Body parser Middleware
app.use(bodyParser.json());

mongoose
  .connect(db_uri, { useNewUrlParser: true })
  .then(() => console.log('Mongoose connection establisted'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log('Port listens to port ==>', port);
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
