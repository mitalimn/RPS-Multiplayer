$(document).ready(function(){
 var config = {
    apiKey: "AIzaSyByI5q3zTJSUh0efLiNDuAh_z4E_WeCp6Y",
    authDomain: "rps-multiplayer-135f3.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-135f3.firebaseio.com",
    storageBucket: "rps-multiplayer-135f3.appspot.com",
    messagingSenderId: "287006667182"
  };
  firebase.initializeApp(config);

// var database = firebase.database();

	$('#add-player').on("click", function(){
			var playerName = $("#pName").val().trim();

			ref = new Firebase("https://rps-multiplayer-135f3.firebaseio.com/");

			ref.once("value" , function(snapshot){
				var p1 =snapshot.child(players).child('1').exists();
				var p2 =snapshot.child(players).child('2').exists();

				$('#player1').html('playerName');
			});
	});
});//.ready function

var url = "https://rps-multiplayer-135f3.firebaseio.com/";
var players = "players";
var player1 = "1";
var player2 = "2";
var turns = 1;
var wins = 0;
var losses = 0;

function play(){
	var playerCount =0;


	ref.on("value", function(snapshot){

	});

}