import {
    framework
} from "./framework.js";

let player = {
    lastTime: undefined,
    crazy: 0,
    crazyClick: 0,
    crazyClickUpgradeCost: 10,
    generatorCount: 0,
    generatorCost: 100
}

framework.makeButton({
    id: 'crazyButton',
    display: 'Im  Crazy?!',
    onClick() {
        player.crazy += 1 + player.crazyClick;
    }
});

framework.makeBuyable({
    id: 'crazyClickUpgradeButton',
    display: 'UPGRADE CRAZY?',
    cost() {
        return player.crazyClickUpgradeCost;
    },
    canBuy() {
        return player.crazy >= this.cost();
    },
    buy() {
        player.crazyClick++;
        player.crazy -= this.cost();
        player.crazyClickUpgradeCost = Math.trunc(this.cost() * 1.25);
    }
});

framework.makeBuyable({
    id: 'generatorButton',
    display: 'Generate Crazy?!',
    cost() {
        return player.generatorCost;
    },
    canBuy() {
        return player.crazy >= this.cost();
    },
    buy() {
        player.generatorCount++;
        player.crazy -= this.cost();
        player.generatorCost = Math.trunc(this.cost() * 1.1);
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

function tick(deltaTimeMS) {
    framework.tick(deltaTimeMS);
    const deltaTimeS = deltaTimeMS / 1000;
    player.crazy += player.generatorCount * deltaTimeS;
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
    setInterval(save, 10000);
    requestAnimationFrame(loop);
}

init();