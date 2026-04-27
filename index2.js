window.addEventListener('load', () => {
    updateCreatorDots();
});

const values = {
    yt: 0,
    tt: 0
};

function changeValue(type, amount) {
    if (amount < 0) { 
        values[type] += amount; 
    } else if (values[type] < 20000 && amount > 0) { 
        values[type] += amount; 
    }

    if (values[type] < 0) values[type] = 0;

    const valueElement = document.getElementById(`${type}-value`);
    valueElement.textContent = values[type].toLocaleString();

    updateDots(type);
    
    const el = document.getElementById(`${type}-value`);
    el.classList.remove("correct", "close", "wrong");
}

function updateDots(type) {
    const dotsContainer = document.getElementById(`${type}-dots`);
    dotsContainer.innerHTML = '';

    const disclaimer = document.createElement('p');
    disclaimer.innerText = "Each dot = 50 videos per minute";
    disclaimer.style.fontSize = "0.85rem";
    disclaimer.style.fontWeight = "300";
    disclaimer.style.marginTop = "1rem";
    disclaimer.style.color = "#666";

    const titleCard = document.getElementById("guess-title");
    if (titleCard.children.length < 2) {
        titleCard.appendChild(disclaimer);
    }

    const numDots = Math.floor(values[type] / 50);
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    }
}

function updateCreatorDots() {
    const dotsContainer = document.getElementById('creator-dots');
    dotsContainer.innerHTML = '';

    // Create 4 filled dots (the successes)
    for (let i = 0; i < 4; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot', 'filled');
        dotsContainer.appendChild(dot);
    }

    // Create 96 bordered dots (the rest)
    for (let i = 0; i < 96; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot', 'outlined');
        dotsContainer.appendChild(dot);
    }
}

function checkAnswer(type) {
    const answers = {
        yt: 500,
        tt: 16000
    };

    const guess = values[type];
    const actual = answers[type];
    const diff = Math.abs(guess - actual);

    const el = document.getElementById(`${type}-value`);
    el.classList.remove("correct", "close", "wrong");

    if (guess === actual) {
        el.classList.add("correct");
        alert("Correct! TikTok creators upload about 16,000 videos every minute.");
    } else if ((type === "tt" && diff / actual < 0.2) || (type === "yt" && diff / actual < 0.3)) {
        el.classList.add("close");
        alert(`Pretty close! The actual answer is ${actual.toLocaleString()} videos per minute.`);
    } else {
        el.classList.add("wrong");
        alert(`Not quite. The actual answer is ${actual.toLocaleString()} videos per minute. ${guess < actual ? "Go higher." : "Go lower."}`);
    }
}
