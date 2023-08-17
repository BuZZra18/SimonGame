var buttonColours =["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern =[];
var level = 0;
var hasStarted = false;

$(document).keypress(function() {
    if(!hasStarted)
        {
            $("h1").text("Level " + level);
            nextSequence();  
            hasStarted = true;
        }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var colorSound = new Audio("./sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }

    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    hasStarted = false;
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randNum = Math.random() * 4;
    randNum = Math.floor(randNum);
    var randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColour);
}