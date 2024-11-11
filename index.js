let userInputText = "";
let sentenceCounter = 0;
let mistakes = 0;

let timerInterval = null;
let seconds = 0;

let performanceData = [];

const specialKeys = {
    "Backspace": "Backspace",
    "Tab": "Tab",
    "Enter": "Enter",
    "Shift": "Shift",
    "Control": "Control",
    "Alt": "Alt",
    "Escape": "Escape",
    " ": "Space",
    "ArrowLeft": "Arrow Left",
    "ArrowUp": "Arrow Up",
    "ArrowRight": "Arrow Right",
    "ArrowDown": "Arrow Down"
};

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore."
];
/*
    ,
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "The early bird catches the worm.",
    "Actions speak louder than words.",
    "Every cloud has a silver lining.",
    "A picture is worth a thousand words.",
    "When life gives you lemons, make lemonade.",
    "Beauty is in the eye of the beholder.",
    "Don't count your chickens before they hatch.",
    "Practice makes perfect.",
    "Better late than never.",
    "Two heads are better than one.",
    "An apple a day keeps the doctor away.",
    "When in Rome, do as the Romans do.",
    "The pen is mightier than the sword.",
    "Honesty is the best policy."
];
*/

let previousInputLength = 0;  // Track the previous input length

function updateDisplay(input, target) {
    let outputHTML = "";
    let correctChars = 0;

    // Iterate through the user input and target text
    for (let i = 0; i < target.length; i++) {
        if (i < input.length) {
            if (input[i] === target[i]) {
                outputHTML += `<span style="color: green">${target[i]}</span>`; // Correct character
                correctChars++;
            } else {
                // Mistake on space or character
                if (target[i] === " ") {
                    outputHTML += `<span style="background-color: red">${target[i]}</span>`; // Incorrect space
                } else {
                    outputHTML += `<span style="color: red">${target[i]}</span>`; // Incorrect character
                }

                // Only increment mistakes if a new character was added (not removed with Backspace)
                if (input.length - 1 === i && input.length > previousInputLength && input[i] !== target[i]) {
                    mistakes++;
                }
            }
        } else {
            // Add the current character with a background color when typing
            if (i === input.length) {
                outputHTML += `<span style="background-color: yellow">${target[i]}</span>`;
            } else {
                outputHTML += `<span>${target[i]}</span>`; // Remaining text
            }
        }
    }

    // Add the blinking cursor at the end of the input
    outputHTML += `<span class="blinking-cursor"></span>`;

    document.getElementById('target-text').innerHTML = outputHTML;

    // Update previous input length to the current length
    previousInputLength = input.length;

    // Check if typing is complete
    if (correctChars === target.length) {
        console.log("Loading new sentence");
        console.log("Mistakes made: " + mistakes);
        loadNextSentence();
    }
}



let startTime = null;  // To track the start time of each sentence

function pushPerformance(){
    // If a sentence was completed, log the time taken to type it
    if (startTime !== null) {
        const endTime = new Date();  // Capture the end time
        const timeTaken = (endTime - startTime) / 1000;  // Time in seconds
        console.log(`Time taken for ${sentenceCounter} sentence was ${timeTaken} seconds. Mistakes made ${mistakes}`);
        
        // Store the performance data with descriptive object keys
        performanceData.push({
            level: sentenceCounter,
            time: timeTaken,
            mistakes: mistakes
        });
        mistakes = 0;
    }
}

function loadNextSentence() {
    // If all sentences are completed, stop the function
    if (sentenceCounter === sentences.length) {
        console.log("KONEC");
        pushPerformance();
        showresults();
        return;
    }


    pushPerformance();
    // Get the next sentence
    const newSentence = sentences[sentenceCounter];
    sentenceCounter++;

    // Update the target text and reset user input
    document.getElementById('target-text').textContent = newSentence;
    userInputText = "";  // Reset user input
    updateDisplay(userInputText, newSentence);

    // Update the counter displaying the current sentence index
    document.getElementById('counter').textContent = `${sentenceCounter} / ${sentences.length}`;

    // Start the timer for the new sentence
    startTime = new Date();  // Record the start time for the new sentence
    mistakes = 0;  // Reset the mistakes counter for the new sentence
}

function showresults() {
    const popUpWindow = window.open('./pop.html', 'name', 'width=700,height=350');

    popUpWindow.onload = () => {
        popUpWindow.postMessage(performanceData, '*');
    };
}



// Handle key events and check for correctness
window.addEventListener('keydown', function(e) {
    const targetText = document.getElementById('target-text').textContent;

    if (specialKeys[e.key] && e.key !== "Backspace" && e.key !== " ") {
        return;  // Skip other special keys
    }

    // Handle Space and Backspace
    if (e.key === " " && userInputText.length < targetText.length) {
        userInputText += " ";
    } else if (e.key === "Backspace") {
        userInputText = userInputText.slice(0, -1);
    } else if (e.key.length === 1 && userInputText.length < targetText.length) {
        // Handle normal characters
        userInputText += e.key;
    }

    updateDisplay(userInputText, targetText);
}, false);

// Initialize display on page load
document.addEventListener('DOMContentLoaded', () => {
    userInputText = "";
    initialText = "game.";

    updateDisplay(userInputText, initialText);
});