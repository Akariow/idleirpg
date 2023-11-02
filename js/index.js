import {
    framework
} from "./framework.js";
import {
    initCrazy
} from "./crazy.js";
import {
    player,save,load
} from "./player.js";

function formatNumber(number) {
    return number.toFixed(0);
}

function tick(deltaTimeMS) {
    framework.tick(deltaTimeMS);
    const deltaTimeS = deltaTimeMS / 1000;
    player.crazy += player.generatorCount * deltaTimeS;
}

let lastTime;

function loop(currentTime) {
    if (lastTime) {
        const deltaTime = currentTime - lastTime;
        tick(deltaTime);
    }
    lastTime = currentTime;
    requestAnimationFrame(loop);
}

function init() {
    load();
    initCrazy();
    setInterval(save, 10000);
    requestAnimationFrame(loop);
}

init();