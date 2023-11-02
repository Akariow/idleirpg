import {
    framework
} from "./framework.js";
import {
    initCrazy
} from "./crazy.js";
import {
    save,load
} from "./player.js";
import {
    loop
} from "./tick.js";


function formatNumber(number) {
    return number.toFixed(0);
}

function init() {
    load();
    initCrazy();
    setInterval(save, 10000);
    requestAnimationFrame(loop);
}

init();