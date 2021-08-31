var ButtonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var flag = false;
var level = 0;

$(document).keypress(function() {
    if (!flag) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      flag = true;
    }
  });

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    PlaySound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        console.log("success");
        
        if(userClickedPattern.length === gamePattern.length){
          setTimeout(function(){
            nextSequence();
          },1000);
        }
    } else {
        console.log("wrong");

        PlaySound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence()
{
    userClickedPattern = [];
    level = level+1;
    $("#level-title").text("Level "+ level);

    var RandomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = ButtonColours[RandomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    PlaySound(randomChosenColour);
}

function PlaySound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentcolour)
{
    $("#" + currentcolour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentcolour).removeClass("pressed");
    }, 100);
}

function startOver()
{
    level = 0;
    gamePattern = [];
    flag = false;
}

