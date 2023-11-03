import {
    framework
} from "./framework.js";
import {
    initCrazy
} from "./crazy.js";
import {
    initFighting
} from "./fighting.js";
import {
    save,
    load,
    doOfflineTicks
} from "./player.js";

function init() {
    load();
    initCrazy();
    initFighting();
    doOfflineTicks();
    setInterval(save, 10000);
    framework.start();
}

init();
