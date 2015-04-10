var fishing = {

  models: {},
  views: {},
  currentUser: null,
  firebaseURL: "https://bragginrights.firebaseio.com/",
  fire: null, // the firebase instance

  init: function() {
    this.currentUser = new Backbone.Model();
    this.fire = new Firebase(this.firebaseURL);
    this.fire.onAuth(this.onAuthCallback);
  },

  register: function(userData) {
    fishing.fire.createUser(userData, function(error, fireData){
      if (error) {
        console.log("Error creating user:", error);
        return;
      } 
      else {
        console.log("Successfully created user account with uid:", fireData.uid);
      }
    });
  },

  login: function(userData) {
    fishing.fire.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);  
        return;  
      } 
      else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });

  },

  onAuthCallback: function(authData) {
    if (authData) {
      fishing.currentUser.set(authData.twitter.cachedUserProfile);
      console.log("A user is logged in:", authData);
      fishing.trigger("sign:in");
    } 
    else {
      fishing.currentUser.clear();
      console.log("No one is logged in");
      fishing.trigger("sign:out");
    }
    fishing.trigger("sign:in:out");
  },

  addGoal: function(goal) {
    //fishing.fire.add(goal);
    var user = new fishing.models.User();
    user.set(goal);
  },

  logout: function() {
      fishing.fire.unauth();
  },

};

_.extend(fishing, Backbone.Events);