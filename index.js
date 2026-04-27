window.addEventListener('load', () => {
    updateCreatorDots(); // Directly call the function to update the dots
});

const values = {
    yt: 0,
    tt: 0
};

function changeValue(type, amount) {
    if (amount < 0) { values[type] += amount; }
    else if (values[type] < 20000 && amount > 0) { values[type] += amount; }

    if (values[type] < 0) values[type] = 0;

    // Update the number on the screen
    const valueElement = document.getElementById(`${type}-value`);
    valueElement.textContent = values[type].toLocaleString();

    // Update the dots
    updateDots(type);
    
    // Reset color when the user changes the input
    const el = document.getElementById(`${type}-value`);
    el.classList.remove("correct", "close", "wrong");
}

function updateDots(type) {
    const dotsContainer = document.getElementById(`${type}-dots`);
    dotsContainer.innerHTML = ''; // Clear previous dots

    const disclaimer = document.createElement('p');
    disclaimer.innerText = "Each dot represents 50 videos.";

    const titleCard = document.getElementById("guess-title");
    if (!(titleCard.children.length == 2)) {
        titleCard.appendChild(disclaimer);
    }

    // Determine the number of dots based on the value
    const numDots = values[type] / 50; // Adjust the divisor to scale the dots
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    }
}

function updateCreatorDots() {
    const dotsContainer = document.getElementById('creator-dots');
    dotsContainer.innerHTML = ''; // Clear previous dots

    // Create 4 bordered dots (white, with black border)
    for (let i = 0; i < 4; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot', 'black'); // 'bordered' adds border style
        dotsContainer.appendChild(dot);
    }

    // Create 96 pure black dots
    for (let i = 0; i < 96; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot', 'bordered'); // 'black' class gives the pure black color
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

    // Reset classes
    el.classList.remove("correct", "close", "wrong");

    if (guess == actual) {
        el.classList.add("correct");
        alert("Correct!");
        document.getElementById()
    } 
    else if ((type == "tt" && diff / actual < 0.2) || (type == "yt" && diff / actual < 0.3)) {
        el.classList.add("close");
        alert("Pretty close 👀");
    } 
    else {
        el.classList.add("wrong");
        alert(`Not quite. ${guess < actual ? "Go higher." : "Go lower."}`);
    }
}