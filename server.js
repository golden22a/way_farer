var express = require('express');
var app = express();
var db = require('./models/index.js');
var bodyParser = require('body-parser'),
    passport = require('passport');
    const config = require('./config');
console.log(config);
//carlos this is your tests
// Configure app
app.set('views', __dirname + '/views');      // Views directory
app.use(express.static('public'));          // Static directory
app.use(bodyParser.urlencoded({ extended: false })); // req.body
//Yo Abdelhalim this is the response to the test!
// Set CORS Headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(passport.initialize());
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
const authCheckMiddleware = require('./config/auth');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
app.use('/api', authCheckMiddleware);
//basic root route
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const cityRoutes = require('./routes/city');
const postRoutes = require('./routes/post');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/city',cityRoutes);
app.use('/api', postRoutes);
app.get('/',function(req,res){
  console.log('do you stuff here')
  });
// Berto was here


app.listen(process.env.PORT || 3000,function(){

  console.log('server running');
});
