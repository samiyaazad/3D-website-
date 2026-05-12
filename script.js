let heartsFound = 0;
const totalHearts = 3;


const hidingItems = ['🎁','🎁','🎁','🧸','💐','☁️','💌','🍬','🧁','🌹'];


window.onload = function () {
    initGame();
};

function initGame() {


    const container = document.querySelector('.hiding-spots-container');


    container.innerHTML = "";

    
    hidingItems.sort(() => Math.random() - 0.5);


    const displayItems = hidingItems.slice(0, 10);


    let heartIndices = new Set();

    while (heartIndices.size < totalHearts) {
        heartIndices.add(
            Math.floor(Math.random() * displayItems.length)
        );
    }

    
    displayItems.forEach((icon, index) => {

        const spot = document.createElement('div');

        spot.classList.add('hiding-spot');

        spot.innerText = icon;

    
        spot.dataset.hasHeart = heartIndices.has(index);

    
        spot.dataset.clicked = "false";

    
        spot.onclick = () => checkSpot(spot);

    
        container.appendChild(spot);
    });
}

function checkSpot(element) {


    if (element.dataset.clicked === "true") {
        return;
    }

    element.dataset.clicked = "true";

    
    if (element.dataset.hasHeart === "true") {

        element.innerText = "❤️";

        
        element.style.transform = "scale(1.3)";

        setTimeout(() => {
            element.style.transform = "scale(1)";
        }, 300);

        heartsFound++;

        document.getElementById('counter').innerText = heartsFound;

        
        if (heartsFound === totalHearts) {

            setTimeout(() => {
                revealEnvelope();
            }, 1000);
        }

    } else {

        
        element.classList.add('shaking');

        element.style.opacity = "0.5";

        
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

function revealEnvelope() {

    const gameStage = document.getElementById('game-stage');

    const envelopeStage = document.getElementById('envelope-stage');

    
    gameStage.style.transition = "opacity 1s ease";

    gameStage.style.opacity = "0";

    setTimeout(() => {

        gameStage.style.display = "none";

        envelopeStage.style.display = "flex";

        envelopeStage.style.opacity = "0";

        setTimeout(() => {

            envelopeStage.style.transition = "opacity 1s ease";

            envelopeStage.style.opacity = "1";

        }, 50);

    }, 1000);
}

function openEnvelope() {

    const letterView = document.getElementById('letter-view');

    letterView.style.display = "flex";

    letterView.style.opacity = "0";

    setTimeout(() => {

        letterView.style.transition = "opacity 0.5s ease";

        letterView.style.opacity = "1";

    }, 10);
}

function closeLetter() {

    const letterView = document.getElementById('letter-view');

    letterView.style.opacity = "0";

    setTimeout(() => {

        letterView.style.display = "none";

    }, 500);
}