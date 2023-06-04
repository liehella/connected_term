const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());


const indexRouter = require('./routes/index');
const UrlRouter = require('./routes/urls');
const PlayedInfoRouter = require('./routes/playedInfo');
const AnalysisRouter = require('./routes/analysis');
app.use('/', indexRouter);
app.use('/urls', UrlRouter);
app.use('/playedInfo',PlayedInfoRouter);
app.use('/analysis',AnalysisRouter);


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



const mongoose = require('mongoose');
// MongoDB 연결 설정
const mongoDBURL = 'mongodb://127.0.0.1:27017/ConnectedPlatform'; // 여기에 사용할 데이터베이스 URL을 입력하세요.

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
db.once('open', function () {
  console.log('MongoDB에 연결되었습니다.');
});






module.exports = app;
