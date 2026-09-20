const typingArea = document.getElementById("typingArea");
const passageElement = document.getElementById("passage");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");
const newPassageBtn = document.getElementById("newPassageBtn");

const passages = [
    "The quick brown fox jumps over the lazy dog.",
    
    "Learning web development requires practice and patience. Keep building small projects and improve every day.",
    
    "Technology is changing the way people communicate, work, and learn in the modern world.",
    
    "Practice makes progress. The more you type, the faster and more accurately you will become.",
    
    "Web development is an exciting field where creativity and programming come together to create useful websites."
];

let currentPassage = "";
let startTime = null;
let timer = null;
let finished = false;

function selectRandomPassage() {

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * passages.length);
    } while (passages[randomIndex] === currentPassage && passages.length > 1);

    currentPassage = passages[randomIndex];

    showPassage();
}

function showPassage() {

    passageElement.innerHTML = "";

    for (let i = 0; i < currentPassage.length; i++) {

        const span = document.createElement("span");

        span.textContent = currentPassage[i];

        passageElement.appendChild(span);
    }
}

function startTimer() {

    if (timer !== null) {
        return;
    }

    startTime = new Date();

    timer = setInterval(function () {

        const now = new Date();

        const seconds = Math.floor(
            (now - startTime) / 1000
        );

        timeDisplay.textContent = seconds;

        calculateResult();

    }, 1000);
}

function calculateResult() {

    const typedText = typingArea.value;

    const characters =
        passageElement.querySelectorAll("span");

    let correctCharacters = 0;


    for (let i = 0; i < characters.length; i++) {

        if (i < typedText.length) {

            if (typedText[i] === currentPassage[i]) {

                characters[i].style.color = "green";

                correctCharacters++;

            } else {

                characters[i].style.color = "red";
            }

        } else {

            characters[i].style.color = "";
        }
    }


    let accuracy = 0;

    if (typedText.length > 0) {

        accuracy =
            (correctCharacters / typedText.length) * 100;
    }

    accuracyDisplay.textContent =
        accuracy.toFixed(1);

    let wpm = 0;

    if (startTime !== null) {

        const now = new Date();

        const seconds =
            (now - startTime) / 1000;

        if (seconds > 0) {

            const minutes = seconds / 60;

            wpm =
                (correctCharacters / 5) / minutes;
        }
    }

    wpmDisplay.textContent =
        Math.round(wpm);

    if (
        typedText.length >= currentPassage.length &&
        !finished
    ) {

        finished = true;

        clearInterval(timer);

        timer = null;

        typingArea.disabled = true;
    }
}

typingArea.addEventListener("input", function () {

    if (startTime === null) {

        startTimer();
    }

    calculateResult();
});

restartBtn.addEventListener("click", function () {

    clearInterval(timer);

    timer = null;

    startTime = null;

    finished = false;

    typingArea.value = "";

    typingArea.disabled = false;

    timeDisplay.textContent = "0";

    wpmDisplay.textContent = "0";

    accuracyDisplay.textContent = "0";

    showPassage();

    typingArea.focus();
});

newPassageBtn.addEventListener("click", function () {

    clearInterval(timer);

    timer = null;

    startTime = null;

    finished = false;

    typingArea.value = "";

    typingArea.disabled = false;

    timeDisplay.textContent = "0";

    wpmDisplay.textContent = "0";

    accuracyDisplay.textContent = "0";

    selectRandomPassage();

    typingArea.focus();
});

selectRandomPassage();