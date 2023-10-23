'use strict';

let player = {
    crazy: 0,
    generatorCount: 0,
    generatorCost: 100,
}



document.getElementById('crazyButton').addEventListener('click', function (event) {
    player.crazy++;
});

document.getElementById('generatorButton').addEventListener('click', function (event) {
    if (player.crazy >= player.generatorCost) {
        player.generatorCount++;
        player.crazy -= player.generatorCost;
        player.generatorCost = Math.trunc(player.generatorCost*1.1+1);
    }
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
    document.getElementById('generatorCost').innerText = formatNumber(player.generatorCost);
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
    setInterval(save, 10000);
    requestAnimationFrame(loop);
}

init();