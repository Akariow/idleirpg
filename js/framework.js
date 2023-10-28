export const framework = {
    ticks: [],
    tick: function (deltaTimeMS) {
        for (let tick of this.ticks) {
            tick(deltaTimeMS);
        }
    },
    idButtonThing: function (id, func) {
        document.getElementById(id).addEventListener('click', func);
    },
    makeButton: function (buttonObject) {
        const button = document.getElementById(buttonObject.id);
        button.textContent = buttonObject.display;
        button.addEventListener('click', buttonObject.onClick);
    },
    makeBuyable: function (buyableObject) {
        const button = document.getElementById(buyableObject.id);
        this.ticks.push(function () {
            button.textContent = '${buyableObject.display}\nCost: ${buyableObject.cost()}';
        });
        button.addEventListener('click', function () {
            if (buyableObject.canBuy()) {
                buyableObject.buy();
            }
        });
    }
};

/*

framework.makeButton({
    id: 'crazyButton',
    display: 'Im Crazy?!',
    onClick: function () {
        player.crazy += 1 + player.crazyClick;
    }
});

framework.makeBuyable({
    id: 'generatorButton',
    display: 'Generate Crazy?!',
    cost: () => player.generatorCost,
    canBuy: () => player.crazy >= this.cost(),
    buy: function () {
        player.generatorCount++;
        player.crazy -= this.cost();
        player.generatorCost = Math.trunc(this.cost() * 1.1);
    }
});

*/