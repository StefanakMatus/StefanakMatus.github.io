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


function checkCorrect(){
    let input = document.getElementById('user-input').textContent;
    let text = document.getElementById('target-text').textContent;
    let current_length = input.length;
    let output = "";

    for (let i = 0; i < current_length; i++) {
        if (input[i] !== text[i]) {
            console.log("Wrong at position: " + i);
            // Wrap the incorrect character in a span and apply a red color
            output += `<span style="color: red">${input[i]}</span>`;
        } else {
            // If the character is correct, simply add it to the output
            output += input[i];
        }
    }
    
        // Update the user input div with the new HTML content
    document.getElementById('user-input').innerHTML = output;
}



window.addEventListener('keydown', function(e) {
    //console.log("keydown: " + whichKey(e));

    const userInputDiv = document.getElementById('user-input');

    if (whichKey(e) === "Space") {
        userInputDiv.textContent += " "; // Add a space
    } else if (whichKey(e) === "Backspace") {
        let currentText = userInputDiv.textContent;
        userInputDiv.textContent = currentText.slice(0, -1); // Remove the last character
    } else if (whichKey(e).length === 1) {  // Ignore special keys and handle normal characters
        userInputDiv.textContent += whichKey(e);
    }

    checkCorrect();
}, false);

