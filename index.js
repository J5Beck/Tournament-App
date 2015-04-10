var express = require("express");
var DataStore = require("nedb");
var json_api = require("json_api");
var session = require('express-session');
var bodyParser = require("body-parser");
var Datastore = require('nedb');
var md5 = require("MD5");

var app = express();

var userDB = new Datastore({ 
  filename: 'db/users', 
  autoload: true 
});

app.use(express.static('public'));

app.use(session({
  secret: 'fishing rules',
  resave: false,
  saveUninitialized: false
}))

// We need this so we can read json that is posted
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// tell express to use the jade view engine
app.set("view engine", "jade");

// our app index
app.get("/", function(req, res) {
  // res.render("index");

  if (req.session.currentUser) {
    // logged in
    res.send("hey there" + req.session.currentUser.username);
  } else {
    // not logged in
    res.redirect("/signin");
  } 
});

app.get("/signin", function(req, res) {
  res.render("signin");
});

app.post("/signin", function(req, res) {
  
  var qry = { 
    email: req.body.email, 
    password: md5(req.body.password) 
  };

  userDB.findOne(qry, function(err, user){
    if (user) {
      req.session.currentUser = user;
      res.redirect("/");
    } else {
      res.render("signin", {
        notice: "Incorrect email or password."
      });
    }
  });

});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
  console.log("post register", req.body);

  var qry = { 
    $or: [
      { username: req.body.username }, 
      { email: req.body.email }
    ] 
  };

  userDB.find(qry, function(err, users){
    if (users.length) {
      res.render("register", {
        notice: "That username or email is already in use."
      });
    } else {
      req.body.password = md5(req.body.password);
      userDB.insert(req.body, function(err){
        res.render("signin", {
          notice: "New User Created. Please log in."
        });
      });
    }
  });

});

app.get("/profile", function(req, res) {
  res.render("profile");
});

app.get("/tournaments/new", function(req, res) {
  res.render("new_tournament");
});

app.get("/tournaments/results", function(req, res) {
  res.render("results");
});

app.get("/user/entry", function(req, res) {
  res.render("entry");
});

app.get("/user/join", function(req, res) {
  res.render("join");
});

app.get("/foo", function(req, res) {
  res.render("foo");
});

var port = process.env.PORT || 8025;
console.log("Listening on port", port);
app.listen(port);
