/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying; // обьявление переменных 

init(); // функция сброса всех данных для новой игры


// кнопка "Roll Dice" (вращение кубика)
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        //случайное число 
        let dice = Math.floor(Math.random() * 6) + 1; //  формула вращения кубика от 1 до 6

        // отображение результата
        let diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = `images/dice-${dice}.png`; //отображение изображение кубика от 1 до 6

        // обновление результата раунда, если значение кубика не равно 1
        if (dice !== 1) {
            // сохранение результата броска игрока, если значение кубика больше 1 и его отображение
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

});

// Сохранение общего счета игрока с помощью кнопки hold
document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        
        // добавление текущего счета к глобальному
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        
        // проверка на 100 очков
        if (scores[activePlayer] >= 20) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // след. игрок
            nextPlayer();
        }
    }
});

// переход к след. игроку и сброс текущего счета
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    // изменение внешнего вида поля активного игрока
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0]; // общий счет 2х игроков
    roundScore = 0; // счет текущего раунда
    activePlayer = 0; // текущий активный игрок

    document.querySelector(".dice").style.display = "none"; // скрытие кубика до начала игры с помощью CSS

    document.getElementById("score-0").textContent = "0"; // установка счета по умолчанию
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    let randActive = Math.floor(Math.random() * 2 + 1);
    randActive === 1 ? document.querySelector(".player-0-panel").classList.add("active") : document.querySelector(".player-1-panel").classList.add("active");
    gamePlaying = true;
}