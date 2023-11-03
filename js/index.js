import {
    initCrazy
} from "./crazy.js";
import {
    initFighting
} from "./fighting.js";
import {
    save,
    load
} from "./player.js";
import {
    loop
} from "./tick.js";

function init() {
    load();
    initCrazy();
    initFighting();
    setInterval(save, 10000);
    requestAnimationFrame(loop);
}

init();