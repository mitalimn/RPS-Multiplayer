var config = {
    apiKey: "AIzaSyBxhrkAQBw_1WkHFGGFOoOUYhrIWtISsGM",
    authDomain: "rps-multiplayer-73560.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-73560.firebaseio.com",
    storageBucket: "rps-multiplayer-73560.appspot.com",
    messagingSenderId: "507729091215"
};
firebase.initializeApp(config);

var gameRef = firebase.database().ref();

//Initially set the data empty

gameRef.child('player1').set('');
gameRef.child('player2').set('');

var p1Name="";
var p2Name="";

var player1Exists;
var player2Exists;

//checks if users are present initially - if/else

$('#add-player').on("click", function() {
    if(!player1Exists && !player2Exists){
        p1Name = $('#pName').val().trim();
        gameRef.child(player1).set(p1Name);
    }
    else if(player1Exists && !player2Exists) {
        p2Name = $('#pName').val().trim();
        gameRef.child(player2).set(p2Name);
    }
    else if(!player1Exists && player2Exists){
        p1Name = $('#pName').val().trim();
        gameRef.child(player1).set(p1Name);
    }

    $(pName).val('');
    return false;
});

//assign

gameRef.on('value', function(snapshot){
    player1Exists = snapshot.val().player1;
    player2Exists = snapshot.val().player2;

    console.log('player1 '+ player1Exists + " "+ "player 2 "+ player2Exists);
});








//=============================
// var config = {
//     apiKey: "AIzaSyBxhrkAQBw_1WkHFGGFOoOUYhrIWtISsGM",
//     authDomain: "rps-multiplayer-73560.firebaseapp.com",
//     databaseURL: "https://rps-multiplayer-73560.firebaseio.com",
//     storageBucket: "rps-multiplayer-73560.appspot.com",
//     messagingSenderId: "507729091215"
// };
// firebase.initializeApp(config);

// var database = firebase.database().ref();


// var player1Name = "";
// var player2Name = "";
// var comment = "";
// var player1Exists = false;
// var player2Exists = false;

// var choice = "";
// var player1Wins = 0;
// var player2Wins = 0;
// var player1losses = 0;
// var player2losses = 0;
// var ties = 0;
// var player1 = null;
// var player2 = null;

// var choice1 = "";
// var choice2 = "";



// //This creates root player and child as 1
// $(document).ready(function() {
// 	//Clears database
// 	database.remove();
// 	//Initially hide thse
// 	    $('#paper1').hide();
//         $('#rock1').hide();
//         $('#scissor1').hide();
//         $('#wins1').hide();
//         $('#losses1').hide(); 
//         $('#paper2').hide();
//         $('#rock2').hide();
//         $('#scissor2').hide();  
//         $('#wins2').hide();
//         $('#losses2').hide(); 

// //=========================================
//     //once addplayer button is clicked 

//     $('#add-player').on("click", function() {

//         if (player1==null) {
//            // console.log("player flag " + player);
//             player1Name = $('#pName').val().trim();
//                 // player = false;
//             database.update({
//                 "player/1/name": player1Name,
//                 "player/1/choice": choice1,
//                 "player/1/wins": player1Wins,
//                 "player/1/losses": player1losses

//             });
//             $("#pName").val("");
//                 player1!=null;
//         } else {

//             console.log("Else ever executes ????- no");
//             console.log("playerflag " + player);
//             player2Name = $('#pName').val().trim();
//             database.update({
//                 "player/2/name": player2Name,
//                 "player/2/choice": choice2,
//                 "player/2/wins": player2Wins,
//                 "player/2/losses": player2losses
//             });

//             $(".playerForm").hide();
//         } //else
//         return false;
//     });

// //=========================================


//     database.child("player/1").on("child_added", function(snapshot) {
//        console.log(snapshot.key);
//         if (snapshot.key == "name") {
//             $("#player1").html("Welcome "+snapshot.val() + " <br>" +"You are player 1");
//         }
//    	    $('#paper1').show();
//         $('#rock1').show();
//         $('#scissor1').show();

        
//     }, function(error) {
//         console.log("Read failed" + error.code);
    
//     });

//     //To get the second player
//     database.child("player/2").on("child_added", function(snapshot) {
//         if (snapshot.key() == "name") {
//             $("#player2").html("Welcome "+snapshot.val() + " <br>" +"You are player 2");
        
//  	       }
//     }, function(error) {
//         console.log("Read failed" + error.code);
//     });

    
//     //Some code for actual RPS game
//     //if player 1 chooses rock

//     $('#rock1').on("click", function() {
//         $('#rock1').addClass('selected');
//         $('#sissor1').hide();
//         $('#paper1').hide();
//         player1 = "r";
//     });

//     //if player 1 chooses paper

//     $('#paper1').on("click", function() {
//         $('#paper1').addClass('selected');
//         $('#sissor1').hide();
//         $('#rock1').hide();
//         player1 = "p";
//     });

//     //if player 1 chooses scissors

//     $('#scissor1').on("click", function() {
//         $('#scissor1').addClass('selected');
//         $('#paper1').hide();
//         $('#rock1').hide();
//         player1 = "s";
//     });


//     //if player 2 chooses rock
//     $('#rock2').on("click", function() {
//         $('#rock2').addClass('selected');
//         $('#scissor2').hide();
//         $('#paper2').hide();
//         player2 = "r";
//     });

//         //if player 2 chooses paper

//     $('#paper2').on("click", function() {
//         $('#paper2').addClass('selected');
//         $('#scissor2').hide();
//         $('#rock2').hide();
//         player2 = "p";
//     });

//         //if player 2 chooses scissors

//     $('#scissor2').on("click", function() {
//         $('#scissor2').addClass('selected');
//         $('#paper2').hide();
//         $('#rock2').hide();
//         player2 = "s";
//     });


//     function choose(){
//     	if((player1 =="r") &&(player2 =="r")){
//     		ties++;
//     		$("#result").html("Its a  tie");
//     	}
//     		else if((player1 =="r") && (player2=="s")){
//     			player1Wins++;
//     			player2losses++;
//     			$('#result').html(player1Name+ "wins!");
//     		}
//     		else if((player1 =="r") &&(player2 =="p")){
//     			player2Wins++;
//     			player1losses++;
//     			$('#result').html(player2Name+ "wins!");
//        		}
//        		else if((player1 =="s")&&(player2 =="s")){
//        			ties++;
//     			$("#result").html("Its a  tie");
//        		}
//        		else if((player1== "s") && (player2 =="r")){
//        			player2Wins++;
//        			player1losses++;
//     			$('#result').html(player2Name+ "wins!");
//        		}
//        		else if((player1== "s") && (player2 =="p")){
//        			player1Wins++;
//     			player2losses++;
//     			$('#result').html(player1Name+ "wins!");
//        		}
//        		else if((player1 == "p") && (player2=="p")){
//        			ties++;
//     			$("#result").html("Its a  tie");
//        		}
//        		else if((player1 == "p") && (player2=="r")){
//        			player1Wins++;
//     			player2losses++;
//     			$('#result').html(player1Name+ "wins!");
//        		}
//        		else if((player1 == "p")&&(player2== "s")){
//        			player2Wins++;
//        			player2losses++;
//        			$('#result').html(player2Name+ "wins!");
//        		}

//        		choice();
//        		database.update({
//        			"player/1/wins" : player1Wins,
//        			"player/1/losses" : player1losses,
//        			"player/2/wins" : player2Wins,
//        			"player/2/losses" : player2losses
//        		});   	
//     }//end function choose


//     //function for individual choice //switch case

//     function choice(){
//     	choice1 = "";
//     	choice2 = "";

//     	switch(player1){
//     		case "r":
//     			choice1 = "rock";
//     			break;
    		
//     		case "p":
//     			choice1 = "paper";
//     			break;
    		
//     		case "s":
//     			choice1 = "scissor";
//     			break;
//     	}

//     	switch(player2){
//     		case "r":
//     			choice2 = "rock";
//     			break;
    		
//     		case "p":
//     			choice2 = "paper";
//     			break;
    		
//     		case "s":
//     			choice2 = "scissor";
//     			break;
//     	}
//     }//end function

// }); //document.ready
