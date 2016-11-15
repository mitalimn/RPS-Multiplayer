 var config = {
    apiKey: "AIzaSyByI5q3zTJSUh0efLiNDuAh_z4E_WeCp6Y",
    authDomain: "rps-multiplayer-135f3.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-135f3.firebaseio.com",
    storageBucket: "rps-multiplayer-135f3.appspot.com",
    messagingSenderId: "287006667182"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//Lets user sign in without username and passwd
  
  //Initial Variables 
  name = "";
  wins = 0;
  losses = 0;
  playerCount = 2;
  // 2. Button for adding Employees
$("#add-player").on("click", function() {

	firebase.auth().signInAnonymously();
  // Grabs user input
  var name = $("#pName").val().trim();

  // Creates local "temporary" object for holding employee data
  var newPlayer = {
    name: name,
    wins : wins,
    losses : losses
  };


  // Uploads employee data to the database
  database.ref().push(newPlayer);

  // Logs everything to console
  console.log(newPlayer.name);
  console.log(newPlayer.wins);
  console.log(newPlayer.losses);


  $(".playerForm").hide();

  $("#showPlayer").show();

  $("#showPlayer").text( "Hello" +" " + name + "! "+ "You are player 1");


  // Alert
  alert("newPlayer successfully added");


  // Prevents moving to new page
  return false;
});

 

 
