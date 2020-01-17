//alert("working");
var isConnected = MBirdSdk.isConnected()

if (isConnected) {
	alert("working, use a mouse and keyboard to play the game"); 
} else {
	alert("MBird JS SDK could not be initialized");
}


var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
		

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

$(document).keypress(function() {
  if (!started) {
    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//function to detect when any of the buttons are clicked
$(".btn").click(function() {
  //variable to store the id of the button that got clicked
  var userChosenColor = $(this).attr("id");
  //add the chosen color to the end of the userClickedPattern array
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length- 1);
});

//check if the pattern is the same
function checkAnswer(currentLevel) {
  //check if the most recent user answer is the same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //check if the user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      //call nextSequence
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
      $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 250);
      startOver();
    }
}

//make a random pattern
function nextSequence() {
  //reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  //Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //select a random color
  var randomChosenColor = buttonColors[randomNumber];
  //add the random color to the end of the gamePattern array
  gamePattern.push(randomChosenColor);
  //select the button with the same id as the randomChosenColor
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// play play the sound for the selected button (color)
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//play animation
function animatePress(currentColor) {
  //add class pressed to the button that gets clicked
  $("#" + currentColor).addClass("pressed");
  //remove class pressed
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 150);
}

//start the game over
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

	