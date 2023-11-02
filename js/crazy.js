import {
    framework
} from "./framework.js";
export function initCrazy() {
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
    
    framework.makeBuyable({
        id: 'generatorButton',
        display: 'Generate Crazy?!',
        cost() {
            return player.generatorCost;
        },
        canBuy() {
            return player.crazy >= this.cost();
        },
        buy() {
            player.generatorCount++;
            player.crazy -= this.cost();
            player.generatorCost = Math.trunc(this.cost() * 1.1);
        }
    });
    
    framework.makeDisplay({
        id: 'crazyDisplay',
        display: 'Craziness',
        value(){
            return formatNumber(player.crazy);
        }
    });
    
    framework.makeDisplay({
        id: 'generatorDisplay',
        display: 'Generators',
        value(){
            return player.generatorCount;
        }
    });
}
