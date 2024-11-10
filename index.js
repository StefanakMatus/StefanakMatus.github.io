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

function checkCorrect(input) {
    let text = document.getElementById('target-text').textContent;
    let current_length = input.length;
    let counter = 0;
    let output = "";


    console.log("Sentence length: " + text.length);
    console.log("Input length: " + current_length);

    if(current_length > text.length){
        console.log("Should be end of the string. DOnt allowe me to take another input");
        return;
    }


    // Compare input with the target text character by character
    for (let i = 0; i < current_length; i++) {
        console.log("i: " + i);
        if(i == current_length-1){
            //set cursors on actuall position where
            output += `<span style="background-color: blue">${text[i]}</span>`;  
        }else{
            //make it default
            output += `<span style="background-color: black">${text[i]}</span>`;  
        }

        if (input[i] == text[i]) {
            output += `<span style="color: green">${text[i]}</span>`;  // Correct character in green
            counter++;
        } else {
            output += `<span style="color: red">${text[i]}</span>`;  // Incorrect character in red
        }
    }

    if(counter === text.length){
        // Load the next sentence here
        let newSentence = "This is the next sentence to type."; // Replace with your desired sentence
        document.getElementById('target-text').textContent = newSentence;

        // Clear the user input
        userInputText = "";
        return;
    }
    // Add the remaining untyped text from the target text in the original color
    if (current_length <= text.length) {
        output += text.slice(current_length); 
        document.getElementById('target-text').innerHTML = output;
    }
}

window.addEventListener('keydown', function(e) {
    if (whichKey(e) === "Space" && (userInputText.length <document.getElementById('target-text').textContent.length)) {
        userInputText += " "; // Add a space
    } else if (whichKey(e) === "Backspace") {
        userInputText = userInputText.slice(0, -1); // Remove the last character
    } else if (whichKey(e).length === 1  && (userInputText.length <document.getElementById('target-text').textContent.length)) {  // Ignore special keys and handle normal characters
        userInputText += whichKey(e);
    }

    checkCorrect(userInputText);
}, false);
