var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []
var level = 0;

var start = 1;
$(document).on("keypress", function(){
    if(start === 1) nextSequence();
    start = 0;  
});

function nextSequence(){
    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function checkAnswer(lastColor){
    if(gamePattern[lastColor] === userClickedPattern[lastColor]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
              }, 1000);
        }
    }else{
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}


function startOver(){
    start = 1;
    gamePattern = [];
    level = 0;
    $("h1").text("Game Over, Press Any Key to Restart");
}
