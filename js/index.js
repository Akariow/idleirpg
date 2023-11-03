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
    load
} from "./player.js";

function init() {
    initCrazy();
    initFighting();
    load();
    setInterval(save, 10000);
    framework.start();
}

init();
