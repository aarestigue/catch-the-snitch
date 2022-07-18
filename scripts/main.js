const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const cWitdh = canvas.width;
const cHeight = canvas.height; 


const player = new Component(50, 50, 'red', 0, 110, ctx);



/* Creating the game */
let game;


/* start game with button */

const startBtn = document.getElementById('start');

startBtn.addEventListener('click', () => {
    if (!game){
        game = new Game (ctx, cWitdh, cHeight, player);
        game.start();
    }

    else if (game && !game.isRunning) {
        /* when crashed */
        game.reset();
    }
    
})

const resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', () => {
    if (game && game.isRunning){
        game.stop();
        game = new Game (ctx, cWitdh, cHeight, player);
        game.start();
    }
    
})


/* Event listener for when we PRESS the key */
document.addEventListener('keydown', (e) => { /* keydown - when someone clicks a key */
    switch (e.code){ /* code - is a property of events (e) */
        case 'ArrowUp' :
            player.speedY -=2;
            break;
        case 'ArrowDown' :
            player.speedY +=2;
            break;
        case 'ArrowRight' :
            player.speedX +=2;
            break;
        case 'ArrowLeft' :
            player.speedX -=2;
            break;
    }
})

/* Event listener for when STOP PRESSING the key */
document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0
});
  