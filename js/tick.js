import {
    framework
} from "./framework.js";

let lastTime;

export function loop(currentTime) {
    if (lastTime) {
        const deltaTime = currentTime - lastTime;
        framework.tick(deltaTime);
    }
    lastTime = currentTime;
    requestAnimationFrame(loop);
}