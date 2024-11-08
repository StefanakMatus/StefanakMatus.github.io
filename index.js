function whichKey(e){
    let charCode = e.keyCode
    console.log(charCode);
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

    if (specialKeys[charCode]) {
        return specialKeys[charCode];
    }
    return String.fromCharCode(charCode); 
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
}, false);