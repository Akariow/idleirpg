export const player = {
    lastTime: undefined,
    crazy: 0,
    crazyClick: 0,
    crazyClickUpgradeCost: 10,
    generatorCount: 0,
    generatorCost: 100
};

export function save() {
    player.lastTime = performance.timeOrigin + performance.now();
    localStorage.setItem('player', JSON.stringify(player));
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

export function load() {
    const playerString = localStorage.getItem('player');
    if (playerString) {
        updateNestedObject(player, JSON.parse(playerString));
        tick(performance.timeOrigin + performance.now() - player.lastTime);
    }
}
