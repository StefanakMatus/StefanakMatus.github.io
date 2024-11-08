function whichKey(e){
    let charCode = e.keyCode
    console.log("Before: " + charCode);
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

    // Check if the key is in the specialKeys object
    if (specialKeys[charCode]) {
        return specialKeys[charCode];
    }

    return String.fromCharCode(charCode); 
}


window.addEventListener('keydown',function(e){
    console.log("keydown: " + whichKey(e));
    if(whichKey(e) == "Space"){
        document.getElementById('keydown').innerText += " ";
    }else if(whichKey(e) == "Backspace"){
        
    }else{
        document.getElementById('keydown').innerText += whichKey(e);
    }
    
},false)