(function(views){

  var Login = React.createClass({displayName: "Login",

    onClick: function(e) {
      e.preventDefault();
      fishing.login();
    },

    render: function() {
      return (
        React.createElement("div", {className: "login"}, 
          React.createElement("button", {className: "button-header", onClick: this.onClick}, "Login")
        )
      )
    }

  });
            // <views.Input type="text" label="Email:" name="email"/>
            // <views.Input type="password" label="Password:" name="password"/>

  var Logout = React.createClass({displayName: "Logout",
    signOut: function(e) {
      e.preventDefault();
      fishing.logout();
    },

    render: function() {
      return (
        React.createElement("div", null, 
          "Welcome Back   ", this.props.username, 
          React.createElement("button", {className: "button-header", onClick: this.signOut}, " Sign Out ")
        )
      );
    }

  });

  var InOut = React.createBackboneClass({
    getLogInOut: function() {
      if (this.props.model.id) {
        return React.createElement(Logout, {username: this.props.model.get("name")});
      } else {
        return React.createElement(Login, null);
      }
    },

    render: function() {
      return (
        React.createElement("div", {className: "login-out"}, 
          this.getLogInOut()
        )
      );
    }

  });


views.InOut = InOut;

})(fishing.views);
(function(views) {

  var entry = React.createClass({displayName: "entry",

    render: function() {
      return (

      React.createElement("div", {className: "entry"}, 
        React.createElement("div", {className: "username"}, 
          React.createElement("form", {className: "entryform"}, 
            React.createElement("label", null, "Checkin Time:  "), React.createElement("input", {type: "time", name: "checkintime"}), React.createElement("br", null), 
            React.createElement("label", null, "Total Fish:  "), React.createElement("input", {type: "number", name: "totalfish"}), React.createElement("br", null), 
            React.createElement("label", null, "Total Wieght: "), React.createElement("input", {type: "number", name: "totalwieght"}), React.createElement("br", null), 
            React.createElement("label", null, "Dead Fish: "), React.createElement("input", {type: "checkbox", name: "deadfish", value: "yes"}), "Yes  ", React.createElement("input", {type: "checkbox", name: "deadfish", value: "no"}), "No", React.createElement("br", null), 
            React.createElement("label", null, "Big Fish Wieght: "), React.createElement("input", {type: "", name: "totalwieght"}), React.createElement("br", null), 
            React.createElement("button", {type: "submit", className: "entryformbtn"}, "Submit")
          )
        )
      )
      )
    }
  });
})(fishing.views);
(function(views) {

  var join = React.createClass({displayName: "join",

    render: function() {
      return (

        React.createElement("div", {className: "join_tournament"}, 
          React.createElement("ul", {className: "tournment_list"}, 
            React.createElement("li", {className: "tournaments_lists"})
          ), 
          React.createElement("a", {href: "#", className: "join_button"}, "Join"), 
          React.createElement("div", {className: "new_tournament"}, 
            React.createElement("a", {href: "#", className: "create_button"}, "Create")
          )
        )
      )
    }
  });
})(fishing.views);



(function(views) {

  var join = React.createClass({displayName: "join",

    render: function() {
      return (

        React.createElement("div", {className: "create_tournament"}, 
          React.createElement("h3", null, "New Tournament Details"), 
          React.createElement("ul", {className: "tournment_details"}, 
            React.createElement("li", {className: "participant"}, "1 Jeff Beck 23.14lbs "), 
            React.createElement("li", {className: "participant"}, "2 Name 2 22.14lbs "), 
            React.createElement("li", {className: "participant"}, "3 Name 3 21.14lbs "), 
            React.createElement("li", {className: "participant"}, "4 Name 4 20.14lbs "), 
            React.createElement("li", {className: "participant"}, "5 Name 5 19.14lbs "), 
            React.createElement("li", {className: "participant"}, "6 Name 6 18.14lbs "), 
            React.createElement("li", {className: "participant"}, "7 Name 7 17.14lbs ")
          ), 
          React.createElement("button", {type: "submit", className: "entryformbtn"}, "Submit")
        )
      )
    }
  });
})(fishing.views);
(function(views) {

  var join = React.createClass({displayName: "join",

    render: function() {
      return (

        React.createElement("div", {className: "stats"}, 
          React.createElement("h3", {className: "tournament_name"}, "All-Childrens Benefit Tournament"), 
          React.createElement("ul", {className: "tournment_stats"}, 
            React.createElement("li", {className: "tournament_name"}, "Tournament Name: All-Childrens Benefit Tournament"), 
            React.createElement("li", {className: "tournament_location"}, "Location: Lake Kissemmee, Lake Wales, FL"), 
            React.createElement("li", {className: "tournament_ramp"}, "Ramp Name/Location: Camp Mack Resort Ramp "), 
            React.createElement("li", {className: "tournament_date"}, "Date: 4/18/2015 "), 
            React.createElement("li", {className: "tournament_launchtime"}, "Launch Time: First Light")
          ), 
          React.createElement("button", {type: "home", className: "entryformbtn"}, "Submit")
        )
      )
    }
  });
})(fishing.views);