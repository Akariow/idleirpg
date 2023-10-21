'use strict';

let player = {
    crazy: 0,
    generatorCount: 0
}



document.getElementById('crazyButton').addEventListener('click', function(event){
    player.crazy++;
    document.getElementById('crazyDisplay').innerText=formatNumber(player.crazy);
});

document.getElementById('generatorButton').addEventListener('click', function(event){
    player.generatorCount++;
    document.getElementById('generatorDisplay').innerText=formatNumber(player.generatorCount);
});

function formatNumber(number) {
    return number.toFixed(0);
}

function tick(deltaTime) {
    const multiplier = deltaTime/1000;
    player.crazy += player.generatorCount * multiplier;
    document.getElementById('crazyDisplay').innerText=formatNumber(player.crazy);
}

let lastTime = performance.now();
function loop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    tick(deltaTime);
    requestAnimationFrame(loop);
}

loop();
