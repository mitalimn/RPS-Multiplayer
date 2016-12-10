  var config = {
    apiKey: "AIzaSyCrP3XyUDIIoAxdlAXbgfMhuYlOIL_fjPg",
    authDomain: "rps-multiplayer-c2165.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-c2165.firebaseio.com",
    storageBucket: "rps-multiplayer-c2165.appspot.com",
    messagingSenderId: "842726933419"
  };
  firebase.initializeApp(config);
var gameRef = firebase.database().ref();

//Initially set the data empty

var playerName='';
var player1Losses = 0;
var player1Wins = 0;
var player2Losses = 0;
var player2Wins = 0;
var playerChoice = '';

gameRef.child('player1').set({
    dbPlayerName: playerName,
    dbPlayerWins: player1Wins,
    dbPlayerLosses:player1Losses,
    dbPlayerChoice: playerChoice
});

gameRef.child('player2').set({
    dbPlayerName: playerName,
    dbPlayerWins: player2Wins,
    dbPlayerLosses:player2Losses,
    dbPlayerChoice: playerChoice
});

gameRef.child('message1').set('');
gameRef.child('message2').set('');

var p1Name='';
var p2Name='';

var player1Exists;
var player2Exists;

//populate buttons for rock paper and scissors

function addButton(){
    var choices = ['ROCK', 'PAPER','SCISSORS'];
    var buttonContainer = ('<div>');

    for(var i=0;i<choices.length;i++){
        console.log('i'+i);
        var buttons = ('<button>', {
            text: choices[i],
            id: choices[i],
            class: 'rpsbtn btn btn-primary'
         })
        // .addClass('rpsbtn btn btn-primary');
        // if(p1Name){buttons.addClass('rpsbtn btn btn-primary')};
        // if(p2Name){buttons.addClass('rpsbtn btn btn-primary')}; 
        $(buttonContainer).append(buttons);
    }

    if(p1Name){
        $('#buttonDiv1').html(buttonContainer);
    }
    else if (p2Name) {
        $('#buttonDiv2').html(buttonContainer);   
    }
}


//checks if users are present initially - if/else

$('#add-player').on("click", function() {
    if($('#pName').val() ==  false){
        $('#errorMsg').html("Enter your name");
        return false;
    }
    if(!player1Exists && !player2Exists){
        p1Name = $('#pName').val().trim();
        console.log("player name "+p1Name);
        playerName = p1Name; 
        console.log("playenam"+playerName);
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

function reset(){
    gameRef.child('player1').child('dbPlayerChoice').set('');
    gameRef.child('player2').child('dbPlayerChoice').set('');
}
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
console.log(player1Exists);
console.log(player2Exists);
    if(p1Name){
        gameRef.child('player1').child('dbPlayerName').set(playerName);
        gameRef.child('player1').child('dbPlayerChoice').set(playerChoice);
        gameRef.child('player1').child('dbPlayerWins').set(player1Wins);
        gameRef.child('player1').child('dbPlayerLosses').set(player1Losses);

        $('#choiceDiv1').html(objP1.dbPlayerChoice + '<br>');
        $('#scoreDiv1').html('You won  '+objP1.dbPlayerWins + '<br>');
        $('#scoreDiv1').append('You loose  '+objP1.dbPlayerLosses);
    }
    else if(p2Name){
        gameRef.child('player2').child('dbPlayerName').set(playerName);
        gameRef.child('player2').child('dbPlayerChoice').set(playerChoice);
        gameRef.child('player2').child('dbPlayerWins').set(player2Wins);
        gameRef.child('player2').child('dbPlayerLosses').set(player2Losses);

        $('#choiceDiv2').html(objP2.dbPlayerChoice + '<br>');
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
        player1Losses++;
        player2Wins++;
    }
    else if(dbPlayer1Choice === 'PAPER' && dbPlayer2Choice === 'SCISSORS'){
        playerChoice = "";
        player1Losses++;
        player2Wins++;
    }
     else if(dbPlayer1Choice === 'SCISSORS' && dbPlayer2Choice === 'ROCK'){
        playerChoice = "";
        player1Losses++;
        player2Wins++;
    }
     else if(dbPlayer2Choice === 'ROCK' && dbPlayer1Choice === 'PAPER'){
        playerChoice = "";
        player2Losses++;
        player1Wins++;
    }
     else if(dbPlayer2Choice === 'PAPER' && dbPlayer1Choice === 'SCISSORS'){
        playerChoice = "";
        player2Losses++;
        player1Wins++;
    }
     else if(dbPlayer2Choice === 'SCISSORS' && dbPlayer1Choice === 'ROCK'){
        playerChoice = "";
        player2Losses++;
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
