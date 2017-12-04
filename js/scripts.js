var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

//Wybór Gracza
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');
pickRock.addEventListener('click', function() {
	playerPick('kamień')
});
pickPaper.addEventListener('click', function() {
	playerPick('papier')
});
pickScissors.addEventListener('click', function() {
	playerPick('nożyce')
});

//Wartości początkowe
var gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

//Wyświetlanie elementów gry
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
	switch(gameState) {
    	case 'started':
        	newGameElem.style.display = 'none';
        	pickElem.style.display = 'block';
        	resultsElem.style.display = 'block';
      		break;
    	case 'ended':
        	newGameBtn.innerText = 'Chcesz zagrać jeszcze raz?';
    	case 'notStarted':
    	default:
       		newGameElem.style.display = 'block';
        	pickElem.style.display = 'none';
        	resultsElem.style.display = 'none';
  	}
}
setGameElements();

//Start gry
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  	player.name = prompt('Proszę podaj swoje imię:', 'imię gracza');
  	if (player.name) {
    	player.score = computer.score = 0;
    	gameState = 'started';
    	setGameElements();
		playerNameElem.innerHTML = player.name;
		setGamePoints();
  }
}

//Wybór komputera
function getComputerPick() {
    var possiblePicks = ['kamień', 'papier', 'nożyce'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

//Logika i punkty
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    var winnerIs = 'player';
    if (playerPick == computerPick) {
        winnerIs = 'noone';
        playerResultElem.innerHTML = "Remis!";
        computerResultElem.innerHTML = "Remis!";
    } else if (
        (computerPick == 'kamień' && playerPick == 'nożyce') ||
        (computerPick == 'nożyce' && playerPick == 'papier') ||
        (computerPick == 'papier' && playerPick == 'kamień')) {
        winnerIs = 'computer';
    }
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    }
    setGamePoints();
    endGame();
}

//Aktualizacja wyniku
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function endGame() {
    if (player.score == 10) {
        alert(player.name + ' Wygrałeś!');
        gameState = 'notStarted';
        setGameElements();
        newGameBtn.innerHTML = 'Chcesz zagrać jeszcze raz?'
        playerResultElem.innerHTML = ' ';
        computerResultElem.innerHTML = ' ';
    } else if (computer.score == 10) {
        alert(player.name + ' Przegrałeś!');
        gameState = 'notStarted';
        setGameElements();
        newGameBtn.innerHTML = 'Chcesz zagrać jeszcze raz?'
        computerResultElem.innerHTML = ' ';
        playerResultElem.innerHTML = ' ';
    }
}