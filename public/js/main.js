$(function() {

  fishing.init();

  var main = document.querySelector(".main");

  // fishing.on("sign:in:out", function() {

    React.render(
      React.createElement(fishing.views.InOut, {model: fishing.currentUser}),
      document.querySelector(".sign-in-out")
    );
      
  // });

  // fishing.on("sign:in", function() {
  //   var user = new fishing.models.User();
  //   React.render(
  //     React.createElement(fishing.views.Profile, {collection: user}),
  //     main
  //   );
  // });

  // fishing.on("sign:out", function() {
  //   // while (main.firstChild) {
  //   //   main.removeChild(main.firstChild);
  //   // }
  // });


  // fishing.on("new:profile", function() {
  //   console.log("help");
  //   React.render(
  //     React.createElement(fishing.views.ProfileForm),
  //     main
  //   );
  // });


  // fishing.on("add:goal", function(profile) {
  //   var user = new fishing.models.User();
  //   user.add(goal);
  //   React.render(
  //     React.createElement(fishing.views.Profile, {collection: user}),
  //     main
  //   );
  // });


  // fishing.fire = new Firebase(fishing.firebaseURL);

  // fishing.fire.onAuth(fishing.onAuthCallback);
  
  // if (fishing.currentUser) {
  //     var user = new fishing.models.User();

  // }

});