

let scores, roundScore, activePlayer, gamePlaying, winScore; // обьявление переменных 

init(); // функция сброса всех данных для новой игры


// кнопка "Roll Dice" (вращение кубика)
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        //случайное число 
        let dice1 = Math.floor(Math.random() * 6) + 1; //  формула вращения кубика от 1 до 6
        let dice2 = Math.floor(Math.random() * 6) + 1;
        
        let dice1DOM = document.querySelector(".dice-1");
        let dice2DOM = document.querySelector(".dice-2");

        dice1DOM.style.display = "block";
        dice2DOM.style.display = "block";
        dice1DOM.src = `images/dice-${dice1}.png`; //отображение изображение кубика от 1 до 6
        dice2DOM.src = `images/dice-${dice2}.png`;
        // обновление результата раунда, если значение кубика не равно 1
       
        if (dice2 === 6 && dice1 === 6){ // проверка на повторное выпадания 6
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = "0";
            nextPlayer();
        }
        else if (dice1 !== 1 && dice2 !== 1) {
            // сохранение результата броска игрока, если значение кубика больше 1 и его отображение
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        
        else {
            nextPlayer();
        }
    }

});

// Сохранение общего счета игрока с помощью кнопки hold
document.querySelector(".btn-hold").addEventListener("click", function () {
    winScore = document.getElementById("win-score").value;
    if (gamePlaying) {
        // добавление текущего счета к глобальному
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        
        // проверка на 100 очков
        if (scores[activePlayer] >= winScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!!";
            document.querySelector(".dice-1").style.display = "none";
            document.querySelector(".dice-2").style.display = "none";
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
    //document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0]; // общий счет 2х игроков
    roundScore = 0; // счет текущего раунда
    activePlayer = 0; // текущий активный игрок
    document.querySelector(".dice-1").style.display = "none"; // скрытие кубика до начала игры с помощью CSS
    document.querySelector(".dice-2").style.display = "none";
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
    document.querySelector(".player-0-panel").classList.add("active");
    gamePlaying = true;
    
}

