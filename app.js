


const express = require('express');
const createError = require('http-errors');
// const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const knex = require('knex')

const indexRouter = require('./routes/index');
const knapsaksRouter = require('./routes/knapsaks');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const packing_listsRouter = require('./routes/packing_lists');

const app = express();
// app.use(bodyParser.json({ type: 'application/json'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users/:userid/knapsaks', knapsaksRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/packing_lists', packing_listsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//console.log(JSON.stringify(app._router.stack));
//console.log(app._router.stack[8].Layer);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
