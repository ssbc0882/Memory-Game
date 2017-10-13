//cards in array with input
var moves = 0;
var cards_pic = ['fa fa-diamond', 'fa fa-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];
var openCards = [];
var game_start = false;
var last_pick = undefined;

//reset button
$('#reset').click(function() {
  resetGame();
});

//random card generator

function randomGenerator() {
  for (let i = 0; i < 2; i++) {
    cards_pic = shuffle(cards_pic);
    cards_pic = forEach(createCard);
  }
};
//timer object
var counter = 0;

function timer() {
  counter++;
  $('#counter').text(counter);
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function cardGenerate() {
  if (openCards.length === 0) {
    $(this).toggleClass('show-open');
    openCards.push($(this));
    disableClick();
  } else if (openCards.length === 1) {
    $(this).toggleClass('show-open');
    openCards.push($(this));
    setTimeout(allOpenCards, 700);
  }
};

function beginCard() {
  if (game_start == false) {
    game_start = true;
    setInterval('timer()', 500);
  };
};


//disable click on open cards
function disableClick() {
  openCards.forEach(function(card) {
    card.off('click');
  });
}
//enable click to closed cards
function enableClick() {
  openCards[0].click(beginCard);
}

//check if cards match
function matchCards() {
  if (cards[0][0].firstChild.className === cards[1][0].firstChild.className) {
    cards[0].addClass('match');
    cards[1].addClass('match');
    enableClick()
  }
}
//star rating
function starRating() {
  if (moves > 16 && moves <= 20) {
    $('#content ul').append('<li><i class="fa fa-star"></i></li>');
    $('#content ul').append('<li><i class="fa fa-star"></i></li>');
    $('#content ul').append('<li><i class="fa fa-star"></i></li>');
    stars = 3;
  } else if (moves > 20 && moves <= 25) {
    $('#content ul').append('<li><i class="fa fa-star"></i></li>');
    $('#content ul').append('<li><i class="fa fa-star"></i></li>');
    stars = 2;
  } else if (moves > 25) {
    $('#content ul').append('<li><i class="fa fa-star"></i></li>');
    stars = 1;
  }
};

//reset game
function resetGame() {
  //moves=0;
  openCards = 0;
  timer.stop();
  $('#deck').empty();
  $('#stars').empty();
  startGame();
}

//if all cards matched
function endGame () {
if ($('.deck').length === 16) {
	$('#success-result').text (starRating);
  timer.pause();

  swal({
    title: 'Congratulations',
    type: 'Success',
    confirmButtonText: 'Play Again?',
    confirmButtonColor: '#f0f0f5',
    cancelButtonColor: '#ebf0fa'
  });
  */
  alert("Congratulations");
}
}

function startGame() {
  beginCard();
  $('#moves').html('0 moves');
}

$(document).ready(function() {
  //start the game
  startGame();
  cardGenerate();
  $('.card').click(function() {
    moves++;
    $('#moves').html(moves + ' moves');
    var selectedCard = $(this).find("i").attr("class");
    var flag = false;
    for (var i = 0; i < cards_pic.length; i++) {
      if (selectedCard == cards_pic[i]) {
        flag = true;
        break;
      }
    }
    if (flag == true) {
      $(this).addClass("match");
      if (last_pick != undefined && selectedCard == last_pick.find("i").attr("class")) {
        last_pick = undefined
        starRating();
      } else if (last_pick != undefined) {
        last_pick.removeClass("match")
      }
      last_pick = $(this);
    }
  });
});
