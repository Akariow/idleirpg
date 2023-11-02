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