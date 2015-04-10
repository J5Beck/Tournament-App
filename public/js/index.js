var express = require("express");
var DataStore = require("nedb");
var json_api = require("json_api");

// var passport = require("passport")

var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    // returnURL: 'http://www.example.com/auth/google/return',
    // realm: 'http://www.example.com/'
  },

  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, 
      function(err, user) {
      done(err, user);
    });
  }
)); 

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));



var app = express();

app.use(require("body-parser",.json());

app.set("view engine", "jade");

app.get("/:page", function(req, res) {
  res.render("page", {
    pageRequested: req.params.page
  });








// var  express = require("express");
// var  DataStore = require("nedb");
// var json_api = require("json_api");

// var app = express();

// var db = new DataStore({filename: "taskify", auotload: true});

// app.use(express.static("public"));

// app.use("taskify", json_api(db))

// app.use("taskify", json_api(db))

// app.set("view engine", "jade");

// app.get("/:page", function(req, res) {
//   res.render("page", {
//     pageRequested: req.params.page
//   });
  
// });

// // defines routes
// // app.get("/:page", function(req, res) {
// //   res.send("you requested: " + req.params.page);
// // });

// console.log("Listening on :8025");
// app.listen(8025);