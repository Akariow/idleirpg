'use strict';

let player = {
    crazy: 0,
    generatorCount: 0
}



document.getElementById('crazyButton').addEventListener('click', function(event){
    player.crazy++;
    document.getElementById('crazyDisplay').innerText=player.crazy;
});

document.getElementById('generatorButton').addEventListener('click', function(event){
    player.generatorCount++;
    document.getElementById('generatorDisplay').innerText=player.generatorCount;
});

function tick(deltaTime) {
    const multiplier = deltaTime/1000;
    player.crazy += player.generatorCount * multiplier;
    document.getElementById('crazyDisplay').innerText=player.crazy;
}

let lastTime = performance.now();
function loop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    tick(deltaTime);
}

setInterval(loop,1000);
