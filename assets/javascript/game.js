var config = {
    apiKey: "AIzaSyBxhrkAQBw_1WkHFGGFOoOUYhrIWtISsGM",
    authDomain: "rps-multiplayer-73560.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-73560.firebaseio.com",
    storageBucket: "rps-multiplayer-73560.appspot.com",
    messagingSenderId: "507729091215"
};
firebase.initializeApp(config);
 
var database = firebase.database().ref();

var name = "";
var comment = "";
var player1Exists = false;
var player2Exists = false;

var choice = "";
var player1Wins = 0;
var player2Wins = 0;
var player2losses = 0;
var player1losses = 0;
var ties = 0;
var player1 = "";
var player2 = "";

var choice1 = "";
var choice2 = "";
var player = true; //flag


//This creates root player and child as 1
$(document).ready(function() {

    database.child("player/1").on("child_added", function(snapshot) {
        if (snapshot.key == "name") {
            $("#player1").html(snapshot.val());
        }
    }, function(error) {
        console.log("Read failed" + error.code);
    });
  
    //To get the second player
    database.child("player/2").on("child_added" , function(snapshot){
    	if(snapshot.key == "name"){
    		$("#player2").html(snapshot.val());
    	}
    }, function(error){
    	console.log("Read failed" + error.code);
    });

      //once addplayer button is clicked 

    $('#add-player').on("click", function() {
// database.remove();

       if (player === true) {
       	   console.log("player flag " + player);
           player1 = $('#pName').val().trim();
           database.update({
               "player/1/name": player1,
               "player/1/choice": choice1,
               "player/1/wins": player1Wins,
               "player/1/losses": player1losses
               
           });

           player = false;          
           console.log("player flag " + player);

       } else {

       	console.log("Else ever executes ????- no");
       	 // console.log("player flag " + player);
           player2 = $('#pName').val().trim();
           database.update({
               "player/2/name": player2,
               "player/2/choice": choice2,
               "player/2/wins": player2Wins,
               "player/2/losses": player2losses
           });

            $(".playerForm").hide();
        } //else

     return false;
   });


    //Some code for actual RPS game



}); //document.ready