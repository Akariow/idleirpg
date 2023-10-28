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
            button.innerHTML = `${buyableObject.display}<br>Cost: ${buyableObject.cost()}`;
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
    display: 'Im  Crazy?!',
    onClick() {
        player.crazy += 1 + player.crazyClick;
    }
});

framework.makeBuyable({
    id: 'crazyClickUpgradeButton',
    display: 'UPGRADE CRAZY?',
    cost() {
        return player.crazyClickUpgradeCost;
    },
    canBuy() {
        return player.crazy >= this.cost();
    },
    buy() {
        player.crazyClick++;
        player.crazy -= this.cost();
        player.crazyClickUpgradeCost = Math.trunc(this.cost() * 1.25);
    }
});

*/