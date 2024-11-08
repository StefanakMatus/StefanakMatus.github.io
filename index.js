function whichKey(e){
    let charCode = e.keyCode
    return String.fromCharCode(charCode); 
}


window.addEventListener('keypress',function(e){
    console.log("Pressed: " + whichKey(e));
},false)