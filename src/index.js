// Sélection des éléments du DOM
const rollDiceBtn = document.querySelector('.roll-dice-btn');
const holdBtn = document.querySelector('.hold-btn');
const newGameBtn = document.querySelector('.new-game-btn');

const player1CurrentElem = document.getElementById('temporaryScore1');
const player2CurrentElem = document.getElementById('temporaryScore2');

const player1Panel = document.querySelector('.player1-panel');
const player2Panel = document.querySelector('.player2-panel');

const player1ScoreElem = document.getElementById('totalScore1');
const player2ScoreElem = document.getElementById('totalScore2');

let scores, currentScore, activePlayer, gamePlaying, remainingRolls;

// Initialisation du jeu
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  remainingRolls = 3;

  player1ScoreElem.textContent = '0';
  player2ScoreElem.textContent = '0';

  player1CurrentElem.textContent = '0';
  player2CurrentElem.textContent = '0';

  player1Panel.classList.remove('active', 'winner', 'active-indicator');
  player2Panel.classList.remove('active', 'winner', 'active-indicator');

  player1Panel.classList.add('active');

  document.getElementById('player1-name').textContent = 'Player 1';
  document.getElementById('player2-name').textContent = 'Player 2';

  rollDiceBtn.disabled = false; // Activer le bouton Roll Dice

  // Réinitialiser l'image du dé au début de chaque tour
  const diceImage = document.querySelector('.dice-img');
  diceImage.classList.add('hidden');
}

// Changement de joueur
function nextPlayer() {
  currentScore = 0;
  player1CurrentElem.textContent = '0';
  player2CurrentElem.textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Panel.classList.toggle('active');
  player2Panel.classList.toggle('active');
  remainingRolls = 5; // Réinitialiser le nombre d'essais restants

  // Réinitialiser l'image du dé au début de chaque tour
  const diceImage = document.querySelector('.dice-img');
  diceImage.classList.add('hidden');

  // Ajouter la classe .active-indicator au panneau du joueur actif
  player1Panel.classList.toggle('active-indicator', activePlayer === 0);
  player2Panel.classList.toggle('active-indicator', activePlayer === 1);
}

// Fonction pour lancer le dé
function rollDice() {
  if (gamePlaying && remainingRolls > 0) {
    // Générer un nombre aléatoire entre 1 et 6
    const dice = Math.floor(Math.random() * 6) + 1;

    // Afficher l'image correspondante au dé
    const diceImage = document.querySelector('.dice-img');
    diceImage.src = `images/dice-${dice}.jpg`;
    diceImage.classList.remove('hidden'); // Afficher l'image du dé

    // Mettre à jour le score courant du joueur actif
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`temporaryScore${activePlayer + 1}`).textContent = currentScore;
    } else {
      nextPlayer();
    }

    remainingRolls--; // Réduire le nombre d'essais restants
    if (remainingRolls === 0) {
      rollDiceBtn.disabled = true; // Désactiver le bouton Roll Dice après 3 lancers
    }
  }
}

// Fonction pour enregistrer le score courant dans le score total
function hold() {
  if (gamePlaying) {
    // Ajouter le score courant au score total du joueur actif
    scores[activePlayer] += currentScore;
    document.getElementById(`totalScore${activePlayer + 1}`).textContent = scores[activePlayer];

    // Vérifier si le joueur a gagné
    if (scores[activePlayer] >= 100) {
      document.getElementById(`player${activePlayer + 1}-name`).textContent = 'Winner!';
      document.querySelector('.dice-img').classList.add('hidden');

      player1Panel.classList.remove('active');
      player2Panel.classList.remove('active');

      player1Panel.classList.add('winner');
      player2Panel.classList.add('winner');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
}

// Fonction pour jouer une nouvelle partie
function newGame() {
  init();
}

// Événements des boutons
rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', newGame);

// Initialiser le jeu au chargement de la page
init();