var express = require("express");
var DataStore = require("nedb");
var json_api = require("json_api");
var session = require('express-session');
var bodyParser = require("body-parser");
var Datastore = require('nedb');
var md5 = require("MD5");
var _ = require("underscore");

var app = express();

var userDB = new Datastore({ 
  filename: 'db/users', 
  autoload: true 
});

var tournamentDB = new Datastore({ 
  filename: 'db/tournaments', 
  autoload: true 
});

var entryDB = new Datastore({ 
  filename: 'db/entries', 
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
    // res.send("hey there" + req.session.currentUser.username);

    if (req.session.currentUser.tournament_id) {
      // user has a tournament
      
      var qry = {
        tournament_id: req.session.currentUser.tournament_id,
        user_id: req.session.currentUser._id
      };

      entryDB.findOne(qry, function(err, entry){
        if (entry) {
          // user has entry

          var tid = req.session.currentUser.tournament_id;
          tournamentResults(tid, function(data){

            data.currentUser = req.session.currentUser;

            res.render("results", data);

          });

        } else {
          // user has not entered results for tournament
          res.render("entry", {
            tournament_id: req.session.currentUser.tournament_id
          });
        }
      });
      
    }
    else {
      // user does not have a tournament
      tournamentDB.find({}, function(err, tournaments){

        res.render("join", {
          tournaments: tournaments,
          currentUser: req.session.currentUser
        });

      });
    }

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

app.get("/signout", function(req, res){
  req.session.destroy(function(err) {
    res.redirect("/");
  })
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

// app.get("/profile", function(req, res) {
//   res.render("profile");
// });

app.post("/tournaments/:id/entry", function(req, res){
  if (req.session.currentUser) {
    var uid = req.session.currentUser._id;
    var tid = req.params.id;

    var entry = req.body;

    entry.total_weight = parseFloat(entry.total_weight);
    
    entry.user_id = uid;
    entry.tournament_id = tid;

    entryDB.insert(entry, function(err){
      res.redirect("/");
    });
  
  } else {
    res.redirect("/signin");
  }
});

app.get("/tournaments/:id/join", function(req, res){
  if (req.session.currentUser) {
    // what user we are changing
    var qry = {
      _id: req.session.currentUser._id
    }

    // set tournament id on user
    req.session.currentUser.tournament_id = req.params.id;

    // what changs we are making
    var changes = req.session.currentUser;

    // update the user
    userDB.update(qry, changes, {}, function(err){
      res.redirect("/");
    });
  } else {
    res.redirect("/signin");
  }
});

app.get("/tournaments/leave", function(req, res){
  if (req.session.currentUser) {
    // what user we are changing
    var qry = {
      _id: req.session.currentUser._id
    }

    // set tournament id on user
    req.session.currentUser.tournament_id = null;

    // what changs we are making
    var changes = req.session.currentUser;

    // update the user
    userDB.update(qry, changes, {}, function(err){
      res.redirect("/");
    });
  } else {
    res.redirect("/signin");
  }
});

app.get("/tournaments/new", function(req, res) {
  res.render("new_tournament");
});

app.post("/tournaments/new", function(req, res) {
  
  if (req.session.currentUser) {
    // validate data
    // .. just kidding

    // insert new tournament
    tournamentDB.insert(req.body, function(err, newTournament){
      // get tournament id and set it on user
      var tid = newTournament._id;

      // what user we are changing
      var qry = {
        _id: req.session.currentUser._id
      }

      // set tournament id on user
      req.session.currentUser.tournament_id = tid;

      // what changs we are making
      var changes = req.session.currentUser;

      // update the user
      userDB.update(qry, changes, {}, function(err){
        res.redirect("/");
      });
    });

  } else {
    res.redirect("/signin");
  }

});


function tournamentResults(tid, cb) {
  var tournament;
  var users;
  var entries;

  tournamentDB.findOne({_id: tid}, function(err, record){
    tournament = record;

    // get users
    userDB.find({tournament_id: tid}, function(err, records){
      users = records;
      if (entries) {
        cb( calculate() );
      }
    });

    // get entries
    entryDB.find({tournament_id: tid}).sort({ total_weight: -1 }).exec(function(err, records){
      entries = records;
      if (users) {
        cb( calculate() );
      }
    });

  });

  function calculate() {
    var results = _.map(entries, function(entry){
      entry.user = _.find(users, function(user){
        return user._id === entry.user_id
      });
      return entry;
    });

    var userIDsWhoHaveEntered = _.map(results, function(result){
      return result.user._id;
    });

    var pendingUsers = _.filter(users, function(user){
      return !_.contains(userIDsWhoHaveEntered, user._id);
    });

    return {
      tournament: tournament,
      results: results,
      pendingUsers: pendingUsers
    }
  }
}

// app.get("/tournaments/results", function(req, res) {
//   res.render("results");
// });

// app.get("/user/entry", function(req, res) {
//   res.render("entry");
// });

// app.get("/user/join", function(req, res) {
//   res.render("join", {
//     tournaments: []
//   });
// });

// app.get("/foo", function(req, res) {
//   res.render("foo");
// });

var port = process.env.PORT || 8025;
console.log("Listening on port", port);
app.listen(port);
