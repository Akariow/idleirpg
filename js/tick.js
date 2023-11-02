import {
    player
} from "./player.js";

export function tick(deltaTimeMS) {
    framework.tick(deltaTimeMS);
    const deltaTimeS = deltaTimeMS / 1000;
    player.crazy += player.generatorCount * deltaTimeS;
}

let lastTime;

export function loop(currentTime) {
    if (lastTime) {
        const deltaTime = currentTime - lastTime;
        tick(deltaTime);
    }
    lastTime = currentTime;
    requestAnimationFrame(loop);
}