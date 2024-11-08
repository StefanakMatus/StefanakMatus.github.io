let userInputText = "";

function whichKey(e) {
    // Check if the key is a special key
    const specialKeys = {
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        27: "Escape",
        32: "Space",
        37: "Arrow Left",
        38: "Arrow Up",
        39: "Arrow Right",
        40: "Arrow Down"
    };

    // Check if key is a special key and return its name
    if (specialKeys[e.keyCode]) {
        return specialKeys[e.keyCode];
    }

    // Handle normal keys, including Shift/CapsLock
    if (e.key.length === 1) {  // Only handle normal characters (not special keys like "Backspace")
        if (e.shiftKey || (e.key >= 'A' && e.key <= 'Z')) {
            return e.key;  // Return the character typed, considering Shift/CapsLock
        } else {
            return e.key.toLowerCase();  // Return lowercase version if no Shift/CapsLock
        }
    }

    return '';
}

function checkCorrect() {
    let input = userInputText;
    let text = document.getElementById('target-text').textContent;
    let current_length = input.length;
    let output = "";

    // Compare input with the target text character by character
    for (let i = 0; i < current_length; i++) {
        if (input[i] !== text[i]) {
            output += `<span style="color: red">${input[i]}</span>`;  // Incorrect character in red
        } else {
            output += `<span style="color: green">${input[i]}</span>`;  // Correct character in green
        }
    }
    
    // Update the target text div with color-coded feedback
    document.getElementById('target-text').innerHTML = output;
}

window.addEventListener('keydown', function(e) {
    if (whichKey(e) === "Space") {
        userInputText += " "; // Add a space
    } else if (whichKey(e) === "Backspace") {
        userInputText = userInputText.slice(0, -1); // Remove the last character
    } else if (whichKey(e).length === 1) {  // Ignore special keys and handle normal characters
        userInputText += whichKey(e);
    }

    console.log(userInputText);
    checkCorrect();
}, false);
