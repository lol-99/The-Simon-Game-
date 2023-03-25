// alert("Hello!");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


//you will need to keep a tract if the game has started or not, so you only call the nextSequence() on the first keypress
var started = false

//hasn't started yet
var level = 0;


$(document).keydown(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).click(function(){ 
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  });

//ANSWER 4
$(".btn").click(function() {

  //variable to store the id of the button that got clicked
  var userChosenColour = $(this).attr("id"); //if chosen correctly then userchosenColour = "green"

  userClickedPattern.push(userChosenColour); // userClickedPattern = ["green"]

  console.log(userClickedPattern);

  //after detecting the click we are playing the audio and enabling the animation effect
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //calling check ansawer after the user has chosen and clicked their answer, passing in the index of the lasst answer in the users sequence.
  checkAnswer(userClickedPattern.length - 1);

});


//??????
function checkAnswer(currentLevel) {

  //checking if the most recent user pattern is same as the
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success!");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
   else {
    console.log("Wrong!");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key To Restart");

    startOver();

  }
}

//GAME GENERATED RANDOM CLICK
function nextSequence() {

  //once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++; //next level started

  $("#level-title").text("Level " + level);

  //ANSWER 1
  var randomNumber = Math.floor(Math.random() * 4); //0-3
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour); //gamePattern = ["green"] , IN LEVEL 2 gamePattern - ["green", "red"]

  console.log("game generated pattern \n" + gamePattern);

  //ANSWER 3
  var chosenButton = $("#" + randomChosenColour); //diff id on every load hence different button on every load

  //by this animation the computer tells you the next button
  chosenButton.fadeIn(100).fadeOut(100).fadeIn(100);

  //adding audio to the corresponding buttons
  playSound(randomChosenColour);

}

function startOver(){
level = 0;
gamePattern = [];
started = false;
}

function playSound(name) {
  //adding audio to the corresponding buttons
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);

  activeButton.addClass("pressed");

  setTimeout(function() {
    activeButton.removeClass("pressed")
  }, 100);

  // activeButton.addClass("pressed").delay(100).removeClass("pressed");

}
