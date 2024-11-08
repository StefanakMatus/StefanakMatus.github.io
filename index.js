function whichKey(e){
    let charCode = e.keyCode
    return String.fromCharCode(charCode); 
}


window.addEventListener('keydown',function(e){
    console.log("keydown: " + whichKey(e));
    document.getElementById('keydown').innerText = whichKey(e);
},false)