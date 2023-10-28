'use strict';

let player = {
    lastTime: undefined,
    crazy: 0,
    crazyClick: 0,
    crazyClickUpgradeCost: 10,
    generatorCount: 0,
    generatorCost: 100
}

document.getElementById('crazyButton').addEventListener('click', function (event) {
    player.crazy += 1 + player.crazyClick;
});

document.getElementById('crazyClickUpgradeButton').addEventListener('click', function (event) {
    if(player.crazy >= player.crazyClickUpgradeCost) {
        player.crazyClick++;
        player.crazy -= player.crazyClickUpgradeCost;
        player.crazyClickUpgradeCost = Math.trunc(player.crazyClickUpgradeCost * 1.25);
    }
});

document.getElementById('generatorButton').addEventListener('click', function (event) {
    if (player.crazy >= player.generatorCost) {
        player.generatorCount++;
        player.crazy -= player.generatorCost;
        player.generatorCost = Math.trunc(player.generatorCost * 1.1);
    }
});



function formatNumber(number) {
    return number.toFixed(0);
}

function save() {
    player.lastTime = performance.timeOrigin + performance.now();
    localStorage.setItem('player', JSON.stringify(player));
}

function load() {
    const playerString = localStorage.getItem('player');
    if (playerString) {
        updateNestedObject(player, JSON.parse(playerString));
        tick(performance.timeOrigin + performance.now() - player.lastTime);
    }
    updateDisplays();
}

function updateNestedObject(obj1, obj2) {
    Object.keys(obj2).forEach((key) => {
        if (obj1.hasOwnProperty(key)) {
            if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
                updateNestedObject(obj1[key], obj2[key]);
            } else {
                obj1[key] = obj2[key];
            }
        }
    });
    return obj1;
}

function tick(deltaTime) {
    const multiplier = deltaTime / 1000;
    player.crazy += player.generatorCount * multiplier;
}

function updateDisplays() {
    document.getElementById('crazyDisplay').innerText = formatNumber(player.crazy);
    document.getElementById('generatorDisplay').innerText = formatNumber(player.generatorCount);
    document.getElementById('generatorCost').innerText = formatNumber(player.generatorCost);
    document.getElementById('crazyClickUpgradeCost').innerText = formatNumber(player.crazyClickUpgradeCost);
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
