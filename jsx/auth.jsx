(function(views){

  var Login = React.createClass({

    onClick: function(e) {
      e.preventDefault();
      fishing.login();
    },

    render: function() {
      return (
        <div className="login">
          <button className="button-header" onClick={this.onClick}>Login</button>
        </div>
      )
    }

  });
            // <views.Input type="text" label="Email:" name="email"/>
            // <views.Input type="password" label="Password:" name="password"/>

  var Logout = React.createClass({
    signOut: function(e) {
      e.preventDefault();
      fishing.logout();
    },

    render: function() {
      return (
        <div>
          Welcome Back   {this.props.username} 
          <button className="button-header" onClick={this.signOut}> Sign Out </button>
        </div>
      );
    }

  });

  var InOut = React.createBackboneClass({
    getLogInOut: function() {
      if (this.props.model.id) {
        return <Logout username={this.props.model.get("name")} />;
      } else {
        return <Login />;
      }
    },

    render: function() {
      return (
        <div className="login-out">
          {this.getLogInOut()}
        </div>
      );
    }

  });


views.InOut = InOut;

})(fishing.views);