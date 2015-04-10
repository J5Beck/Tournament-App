// (function(models){

//   var User = Backbone.Firebase.Collection.extend({
//     url: function() {
//       if (!fishing.currentUser) {
//           throw new Error ("No one is logged in.");
//       } else {
//         var uid = encodeURIComponent(fishing.currentUser.uid);
//         return fishing.firebaseURL + uid + "/goals/";
//       }

//     }

//   });

//   models.User = User;

// })(fishing.models);