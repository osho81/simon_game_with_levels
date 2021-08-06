let grid = document.querySelector('.button-grid');
let gridSize;
let btnList = [];

const buttonColours = ["red", "blue", "green", "yellow", "chartreuse", "orange", "magenta", "white", "cyan"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Capture player level choice: easy (4 buttons) or hard (9) and create corresponding grid
$(".button-form").click(function (e) {
  if (e.target.id == "easy-level") {
    gridSize = 4;
    for (let i = 0; i < gridSize; i++) {
      const btnSpot = document.createElement('div');
      btnSpot.setAttribute('type', 'button');   //uneccessary 
      btnSpot.setAttribute('class', 'btn button-larger');
      btnSpot.classList.add(buttonColours[i]);
      btnSpot.setAttribute('id', buttonColours[i]);
      grid.appendChild(btnSpot);
      btnList.push(btnSpot);
    }
  } else {   //i.e. if hard
    gridSize = 9;
    for (let i = 0; i < gridSize; i++) {
      const btnSpot = document.createElement('div');
      btnSpot.setAttribute('type', 'button');
      btnSpot.setAttribute('class', 'btn button-smaller');
      btnSpot.classList.add(buttonColours[i]);
      btnSpot.setAttribute('id', buttonColours[i]);
      grid.appendChild(btnSpot);
      btnList.push(btnSpot);
    }
  }

  // Add event-listener for each created button
  for (let i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener("click", clickCapturing);

  }

  // Hide button after user choice
  $(".button-form").css({ 'display': 'none' });   //OR: $(this)...

  if (!started) {
    // $("#level-title").text("Level " + level);  //redundant "level 0"
    nextSequence();
    started = true;
  }
});

// Each button click is registered & saved, to compare it with the game pattern  
function clickCapturing(event) {
  const userChosenColour = $(event.target).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over - Restarting the game.");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);

    // Restart/refresh page
    setTimeout(function () { document.location.href = ''; }, 2000);
  }
}

// First function after the game grid is created; first random button generated
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  const randomNumber = Math.floor(Math.random() * gridSize);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
