var buttonColours =["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern =[];
var level = 0;
var hasStarted = false;

//keypress event to check if the game has started where hasStarted variable is used to check if the game has started or not.
//nextSequence called to generate the game sequence.
$(document).keypress(function() {
    if(!hasStarted)
        {
            $("h1").text("Level " + level);
            nextSequence();  
            hasStarted = true;
        }
});

/*button click event to register and store users click input, 
playsound function called to play sound according to the color clicked,
animatePress function called to show animation to know which tile is clicked and
checkAnswer function to check the users click sequence to the sequence generated by nextSequence function.
.*/
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//playSound function declared to play sound according to the color name.
function playSound(name) {
    var colorSound = new Audio("./sounds/" + name + ".mp3");
    colorSound.play();
}

//animatePress function to create a short animation to know the tile clicked.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);
}


/*checkAnswer function to compare user's click sequence to generated sequence 
and increase level if the sequence matches.
*/
function checkAnswer(currentLevel) {

    //if condition to check if the last generated click pattern matches with the user's last click pattern.
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        //if condition to check if the number of click pattern generated matches user's number of click pattern.
        if(userClickedPattern.length === gamePattern.length) {

            //Click pattern to be generated using nextSequence function with a delay of 1 second or 1000 milliseconds if the sequence matches.
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }

    /*else statement to be executed if the user's sequence and generated sequence doesn't match
    resulting in everything being reset including level.*/
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//startOver function to reset all the sequence and start over.
function startOver() {
    level = 0;
    gamePattern = [];
    hasStarted = false;
}


//nextSequence function to generate a random sequence of click pattern and increase level each time it is called.
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    //Random tile to be selected among the 4 tiles of 4 different colours.
    var randNum = Math.random() * 4;
    randNum = Math.floor(randNum);
    var randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);

    //Random tile chosen to create animation to show the sequence to the user and play sound according to the tile selected.
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColour);
}