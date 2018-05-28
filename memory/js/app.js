//Create a list that holds all of your cards, define deck element, define moves counter and moves counter elements.

let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-anchor", "fa-anchor", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

// Define document elements
let deck = document.getElementById("deck");
let stars = document.getElementById("stars").children;
let moveCounter = document.getElementById("moves");
let restartBtn = document.getElementsByClassName("restart");
let modal = document.getElementById("modal");
let scoreStars = document.getElementById("scorestars");

// define ingame variables
let openCards = [];
let move = 0;
let score = 3;
let seconds = 0;

// write moves to DOM
moveCounter.innerHTML = move;

// Add game restart function to restart buttons
for (i = 0; i < restartBtn.length; i++) {
    restartBtn[i].addEventListener("click", restartFunc);
}

// timer function from https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript
setInterval(function () {
    seconds++;
}, 1000);

// restart function for buttons
function restartFunc() {
    move = 0;
    seconds = 0;
    moveCounter.innerHTML = move;
    let lostScore = document.getElementById("stars").children;
    for (i = 0; i < lostScore.length; i++) {
        lostScore[i].firstChild.classList.add("fa-star");
        lostScore[i].firstChild.classList.remove("fa-star-o");
    }
    document.getElementById("deck").innerHTML = "";
    modal.style.display = "none"
    openCards = [];
    shuffle(cards);
    appendCards();
    addClickEvent();
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

shuffle(cards);

// add shuffled cards to deck
function appendCards() {
    for (i = 0; i < cards.length; i++) {
        let card = document.createElement("li");
        card.setAttribute('class', 'card');
        deck.appendChild(card);
        let fa = document.createElement("i");
        fa.setAttribute('class', "fa " + cards[i]);
        card.appendChild(fa);
    };
}

appendCards();

// add event listener to cards
function addClickEvent() {
    for (card of deck.children) {
        card.addEventListener("click", gameFunc);
    }
}

addClickEvent();

// base game function
function gameFunc(event) {
    if (event.target.classList != "match" && openCards.length < 2) {
        showCard();
        if (openCards.length == 2) {
            checkMatch();
        }
    }
}

// function to show card on click and store cards in variable to compare
function showCard() {
    if (event.target.className == "card") {
        event.target.classList.toggle("open");
        event.target.classList.toggle("show");
        openCards.push(event.target);
    }
}

// function to compare cards
function checkMatch() {
    if (openCards[0].firstChild.className == openCards[1].firstChild.className) {
        guessFunc();
        move += 1;
        moveCounter.innerHTML = move;
        scoreFunc();
        openCards = [];
        wonAlert();
    } else {
        setTimeout(function () {
            missFunc();
            move += 1;
            moveCounter.innerHTML = move;
            scoreFunc();
            openCards = [];
        }, 800);
    }
}

// function to mark correct cards
function guessFunc() {
    for (i = 0; i < openCards.length; i++) {
        openCards[i].classList.toggle("open");
        openCards[i].classList.toggle("match");
    };
};

//function to hide missed cards
function missFunc() {
    for (i = 0; i < openCards.length; i++) {
        openCards[i].classList.toggle("open");
        openCards[i].classList.toggle("show");
    };
};

// function count score
function scoreFunc() {
    if (move > 15) {
        stars[0].firstElementChild.classList.remove("fa-star");
        stars[0].firstElementChild.classList.add("fa-star-o");
        score = 2;
    };
    if (move > 18) {
        stars[1].firstElementChild.classList.remove("fa-star");
        stars[1].firstElementChild.classList.add("fa-star-o");
        score = 1;
    }
};

// function to delay modal display on win event
function wonAlert() {
    setTimeout(function () {
        showModal();
    }, 50);
}

// function to show modal
function showModal() {
    if (document.getElementsByClassName("match").length === document.getElementsByClassName("card").length) {
        modal.style.display = "flex";
        document.getElementById("finalscore").innerHTML = score;
        document.getElementById("finaltime").innerHTML = seconds;
        pushStars();
    }
};

//function to push score stars to modal on win event
function pushStars() {
    for (i = 0; i < score; i++) {
        let scoreStars = document.getElementById("scorestars");
        let star = document.createElement("li");
        scoreStars.appendChild(star);
        let icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-star");
        star.appendChild(icon);
    }
};
