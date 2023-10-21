'use strict';

let player = {
    crazy: 0,
    generatorCount: 0
}


document.getElementById('crazyButton').addEventListener('click', function(event){
    player.crazy++;
    document.getElementById('crazyDisplay').innerText=player.crazy;
});

document.getElementById('generatorButton').addEventListener('click', function(event){
    player.generatorCount++;
    document.getElementById('generatorDisplay').innerText=player.generatorCount;
});
