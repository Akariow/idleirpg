'use strict';

let player = {
    crazy: 0,
    generatorCount: 0
}



document.getElementById('crazyButton').addEventListener('click', function (event) {
    player.crazy++;
});

document.getElementById('generatorButton').addEventListener('click', function (event) {
    player.generatorCount++;
});


function formatNumber(number) {
    return number.toFixed(0);
}

function save() {
    localStorage.setItem('player', JSON.stringify(player));
}

function load() {
    const playerString = localStorage.getItem('player');
    if (playerString) {
        player = JSON.parse(playerString);
    }
}

function tick(deltaTime) {
    const multiplier = deltaTime / 1000;
    player.crazy += player.generatorCount * multiplier;
}

function updateDisplays() {
    document.getElementById('crazyDisplay').innerText = formatNumber(player.crazy);
    document.getElementById('generatorDisplay').innerText = formatNumber(player.generatorCount);
}

let lastTime;

function loop(currentTime) {
    if (lastTime) {
        const deltaTime = currentTime - lastTime;
        tick(deltaTime);
    }
    updateDisplays();
    lastTime = currentTime;
    requestAnimationFrame(loop);
}

function init() {
    load();
    setInterval(save,10000);
    requestAnimationFrame(loop);
}

init();
