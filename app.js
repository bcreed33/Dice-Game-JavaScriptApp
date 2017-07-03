/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//GLOBAL vars
var scores, roundScore, activePlayer, gamePlaying;
//Starts the game
gameInit();




//Action when user clicks the "ROLL DICE" button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // generates a random number
        var dice = Math.floor(Math.random()*6) +1;
        //display the result of the "dice roll" and change the image of the dice to match the roll.
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display= 'block';
        diceDOM.src= 'dice-'+dice+'.png';
        //console.log(dice);
        //update the round score IF the rolled number was not a 1
        if(dice !== 1){
            //adding up the score in the current box
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            //next players turn
            nextPlayer();
        }
    }
});






document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;
        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //check to see if the player won the game
        if(scores[activePlayer] >= 100){
          //changing Player 1/2 to "winner".
          document.querySelector('#name-'+ activePlayer).innerHTML = 'Winner';
          //Hiding the dice when the game is over.
          document.querySelector('.dice').style.display="none";
          // adding the class winner to the player that won the game and removing the class active.
          document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
          document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
          //Kills the function of the buttons of roll dice and hold.
          gamePlaying = false;
        }
        else {
          nextPlayer();
        }

    }
});

//Starts a new game when you click the "New Game" button
document.querySelector('.btn-new').addEventListener('click', gameInit);



//Resest / Starts a new game
function gameInit() {
    //Resests all the scores
    scores= [0,0];
    roundScore = 0;
    activePlayer=0;
    gamePlaying = true;
    //Hides the dice until the "roll dice" button is hit (again)
    document.querySelector('.dice').style.display= 'none';
    //sets all the scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //resets / sets the players title
    document.querySelector('#name-0').innerHTML = 'Player 1';
    document.querySelector('#name-1').innerHTML = 'Player 2';
    //making sure both player 1 & 2 dont have the class of winner
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //making sure both player 1 & 2 dont have the class of active
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //setting the active class to player 1 for the start of the game
    document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer(){
    //next players turn
    activePlayer === 0 ? activePlayer=1 : activePlayer=0;
    roundScore = 0;
    // resets the players round score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // toggels the active class for the players section
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //Hides the dice when players change turns
    //document.querySelector('.dice').style.display='none';
};




//displays the rules
document.querySelector('.btn-rules').addEventListener('click', function() {
    document.querySelector('#rulesBG').style.display='block';
});


// hides the rules
document.querySelector('#closePopup').addEventListener('click', function() {
    document.querySelector('#rulesBG').style.display='none';
});
document.querySelector('#rulesBG').addEventListener('click', function() {
    document.querySelector('#rulesBG').style.display='none';
});
