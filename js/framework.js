export const framework = {
    ticks: [],
    tick(deltaTimeMS) {
        for (let tick of this.ticks) {
            tick(deltaTimeMS);
        }
    },
    loop: (function () {
        let lastTime;
        return function (currentTime) {
            if (lastTime) {
                const deltaTime = currentTime - lastTime;
                this.tick(deltaTime);
            }
            lastTime = currentTime;
            requestAnimationFrame(this.loop);
        }
    })(),
    start() {
        requestAnimationFrame(this.loop);
    },
    getValue(attribute) {
        if (typeof attribute === 'function') {
            return attribute()
        } else {
            return attribute;
        }
    },
    makeClickable(clickableObject) {
        const button = document.getElementById(clickableObject.id);
        button.textContent = clickableObject.display;
        button.addEventListener('click', clickableObject.onClick);
    },
    makeBuyable(buyableObject) {
        const button = document.getElementById(buyableObject.id);
        this.ticks.push(function () {
            button.innerHTML = `${buyableObject.display}<br>Cost: ${buyableObject.cost()}`;
        });
        button.addEventListener('click', function () {
            if (buyableObject.canBuy()) {
                buyableObject.buy();
            }
        });
    },
    makeDisplay(displayObject) {
        const display = document.getElementById(displayObject.id);
        if (displayObject.title) {
            this.ticks.push(function () {
                display.innerHTML = `${displayObject.title}<br>${displayObject.value()}`;
            });
        } else if (displayObject.display) {
            this.ticks.push(function () {
                display.innerHTML = `${displayObject.display}: ${displayObject.value()}`;
            });
        } else {
            this.ticks.push(function () {
                display.innerHTML = `${displayObject.value()}`;
            });
        }
    }
};

/*

framework.makeClickable({
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

framework.makeDisplay({
    id: 'crazyDisplay',
    display: 'Craziness',
    value(){
        return player.crazy;
    }
});

*/