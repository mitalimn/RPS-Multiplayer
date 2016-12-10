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

var playerName = "";
var player1losses = 0;
var player1Wins = 0;
var player2losses = 0;
var player2Wins = 0;
var playerChoice = "";

gameRef.child('player1').set({
    dbPlayerName: playerName,
    dbPlayerWins: player1Wins,
    dbPlayerLosses:player1losses,
    dbPlayerChoice: playerChoice
});

gameRef.child('player2').set({
    dbPlayerName: playerName,
    dbPlayerWins: player1Wins,
    dbPlayerLosses:player1losses,
    dbPlayerChoice: playerChoice
});

gameRef.child('message1').set('');
gameRef.child('message2').set('');

var p1Name="";
var p2Name="";

var player1Exists;
var player2Exists;

//populate buttons for rock paper and scissors

function addButton(){
    var choices = ['ROCK', 'PAPER','SCISSORS'];
    var buttonContainer = ('<div>');
    for(var i=0;i<choices.length;i++){
        var btn = ('<button>', {
            text: choices[i],
            id: choices[i],
        });
        if(p1Name){
            btn.addClass("rpsbtn btn btn-primary");
        }
        if(p2Name){
            btn.addClass("rpsbtn btn btn-primary");
        }
        $(buttonContainer).append(btn);
    };

    if(p1Name){
        $('#buttonDiv1').html(buttonContainer);
    }
    else if (p2Name) {
        $('#buttonDiv2').html(buttonContainer);   
    }
}

//checks if users are present initially - if/else

$('#add-player').on("click", function() {
    if(!player1Exists && !player2Exists){
        p1Name = $('#pName').val().trim();
        playerName = p1Name; 
        gameRef.child('player1').child('dbPlayerName').set(p1Name);
        $(".playerForm").html("Welcome "+ p1Name+
         " <br>" +"You are player 1");
        addButton();

    }
    else if(player1Exists && !player2Exists) {
        p2Name = $('#pName').val().trim();
        playerName = p2Name; 
        gameRef.child('player2').child('dbPlayerName').set(p2Name);
        $(".playerForm").html("Welcome "+ p2Name +
         " <br>" +"You are player 2");
        addButton();
    }
    else if(!player1Exists && player2Exists){
        p1Name = $('#pName').val().trim();
        playerName = p1Name; 
        gameRef.child('player1').child('dbPlayerName').set(p1Name);
        $("#player1").html("Welcome "+ p1Name + 
            " <br>" +"You are player 1");
        addButton();
    }

    $('#pName').val('');
    return false;
});

//on rock paper scissor button click

$('#buttonDiv1', '#buttonDiv2').on("click" ,'.rpsbtn', function(){
    if(this.id==="ROCK"){
        playerChoice = this.id;
    }
    else if(this.id==="PAPER"){
        playerChoice = this.id;
    }
    else if(this.id==="SCISSORS"){
        playerChoice = this.id;
    }

    if(p1Name){
        gameRef.child('player1').child('dbPlayerChoice').set(playerChoice);
        $('#buttonDiv1').text("Waiting for Player 2 to choose");
    }
    else if(p2Name){
        gameRef.child('player2').child('dbPlayerChoice').set(playerChoice);
        $('#buttonDiv2').text("Waiting for Player 1 to choose");
    }
});

//assign

gameRef.on('value', function(snapshot){

    var objP1 = snapshot.val().player1;
    var objP2 = snapshot.val().player2;

    player1Exists =objP1.dbPlayerName;
    player2Exists = objP2.dbPlayerName;

console.log("player1Exists "+ player1Exists);

    if(p1Name){
        gameRef.child('player1').child('dbPlayerName').set(playerName);
        gameRef.child('player1').child('dbPlayerChoice').set(playerChoice);
        gameRef.child('player1').child('dbPlayerWins').set(player1Wins);
        gameRef.child('player1').child('dbPlayerLosses').set(player1losses);

        $('#choiceDiv1').html(objP1.dbPlayerChoice + '<br>');
        $('#scoreDiv1').html('You won  '+objP1.dbPlayerWins + '<br>');
        $('#scoreDiv1').append('You loose  '+objP1.dbPlayerLosses);
    }
    else if(p2Name){
        gameRef.child('player2').child('dbPlayerName').set(playerName);
        gameRef.child('player2').child('dbPlayerChoice').set(playerChoice);
        gameRef.child('player2').child('dbPlayerWins').set(player2Wins);
        gameRef.child('player2').child('dbPlayerLosses').set(player2losses);

        $('#choiceDiv2').html(objp2.dbPlayerChoice + '<br>');
        $('#scoreDiv2').html('You won  '+objP2.dbPlayerWins + '<br>');
        $('#scoreDiv2').append('You loose  '+objP2.dbPlayerLosses);
    }

    if(!player1Exists){
        $('#p1wait').html("Waiting for player 1");
    }
    else if(player1Exists){
        $('#p1wait').html(player1Exists);
    }

    if(!player2Exists){
        $('#p2wait').html("Waiting for player 2");
    }
    else if(player1Exists){
        $('#p2wait').html(player2Exists);
    }

    var dbPlayer1Choice = snapshot.val().player1.dbPlayerChoice;
    var dbPlayer2Choice = snapshot.val().player2.dbPlayerChoice;


    if(!dbPlayer1Choice){
        addButton(); //display the button again
    }
    else if(!dbPlayer2Choice){
        addButton();
    }

    //tie logic

    if(dbPlayer1Choice === dbPlayer2Choice){
        playerChoice = "";

    }
    else if(dbPlayer1Choice === 'ROCK' && dbPlayer2Choice === 'PAPER'){
        playerChoice = "";
        player1losses++;
        player2Wins++;
    }
    else if(dbPlayer1Choice === 'PAPER' && dbPlayer2Choice === 'SCISSORS'){
        playerChoice = "";
        player1losses++;
        player2Wins++;
    }
     else if(dbPlayer1Choice === 'SCISSORS' && dbPlayer2Choice === 'ROCK'){
        playerChoice = "";
        player1losses++;
        player2Wins++;
    }
     else if(dbPlayer2Choice === 'ROCK' && dbPlayer1Choice === 'PAPER'){
        playerChoice = "";
        player2losses++;
        player1Wins++;
    }
     else if(dbPlayer2Choice === 'PAPER' && dbPlayer1Choice === 'SCISSORS'){
        playerChoice = "";
        player2losses++;
        player1Wins++;
    }
     else if(dbPlayer2Choice === 'SCISSORS' && dbPlayer2Choice === 'ROCK'){
        playerChoice = "";
        player2losses++;
        player1Wins++;
    }


});

//chat 

$('#chat').on("click", function(){
    var userMsg = $('#usermsg').val();
    if(userMsg == false){
        return false;
    }

    if(p1Name){
        gameRef.child('message1').set(p1Name + ':' +userMsg+'<br>');
        $('#usermsg').val('');
    }
    else if(p2Name){
        gameRef.child('message2').set(p2Name + ':' +userMsg+'<br>');
        $('#usermsg').val('');
    }
   return false;
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
