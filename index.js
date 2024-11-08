function whichKey(e){
    let charCode = e.keyCode
    return String.fromCharCode(charCode); 
}


window.addEventListener('keypress',function(e){
    console.log("Pressed: " + whichKey(e));
    document.getElementById('keyPressed').innerText = whichKey(e);
},false)