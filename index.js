'use strict';

let craziestCounter = 0

document.getElementById('crazyButton').addEventListener('click', function(event){
    craziestCounter++;
    console.log('Button has been pressed',craziestCounter,'times o7');
    document.getElementById('craziestCounterDisplay').innerText=craziestCounter;
});
