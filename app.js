var createError = require('http-errors');
var express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Apierror=require("./ulits/apiErorr")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost/news').then((con)=>{
  console.log('db conect')
}).catch((err)=>{
  console.log(err)
})
app.all("*",(req,res,next)=>{
  // var error=new Error(`the route this ${req.originalUrl} not found`);
  // next(error.message);
  next(new Apierror(`the route this ${req.originalUrl} not found`,404));
})
// app.use(
//     fileUpload({
//       limits: {
//         fileSize: 10000000, // Around 10MB
//       },
//       abortOnLimit: true,
//     })
// );

process.on("unhandledrejection",(err)=>{
  console.error(`unhandledrejection Error ${err}`)
  process.exit(1);
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Usage:




module.exports = app;
