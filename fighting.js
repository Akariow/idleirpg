let fighting = {
    PLAYER: {
        NAME: "Allah",
        HP: 1000,
        ATK: 15
    },
    ENEMY: {
        NAME: "Aiwass?",
        HP: 1000,
        ATK: 14
    }
}

function randomizeDamage(atk) {
    const damageRange = 3;
    const lowerDamage = atk / damageRange;
    const upperDamage = atk * damageRange;
    const iterations = 2;
    let damage = 0;
    for (let i = 0; i < iterations; i++) {
        damage += lowerDamage + Math.random() * (upperDamage - lowerDamage);
    }
    damage = damage / iterations;
    damage = Math.trunc(damage);
    return damage;
}

function attack (attacker, defender) {
    const damage = randomizeDamage(attacker.ATK);
    defender.HP -= damage;
    if (defender.HP < 0) defender.HP = 0; 
    console.log(`${attacker.NAME} dealt ${damage} damage | ${defender.NAME}'s HP is now ${defender.HP}`);
}

function fight(player, enemy) {
    player = structuredClone(player);
    enemy = structuredClone(enemy);

    while (true) {
        attack(player, enemy);
        if (enemy.HP <= 0) break;
        attack(enemy, player);
        if (player.HP <= 0) break;
    }

    if (enemy.HP <= 0) {
        console.log("YOU WON!!!!");
        return true;
    } else {
        console.log("NOOOOOB!!!!");
        return false;
    }
}

//fight(fighting.PLAYER, fighting.ENEMY);
