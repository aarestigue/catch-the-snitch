const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const cWitdh = canvas.width;
const cHeight = canvas.height; 


const player = new Component(70, 70, './docs/assets/images/griffyndor_seeker.png', 450, 300, ctx);



/* Creating the game */
let game;
let enemies; 


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
        game.clear();
        game.reset();
        game = new Game (ctx, cWitdh, cHeight, player);
        game.start();
    }
    
})


/* Event listener for when we PRESS the key */
document.addEventListener('keydown', (e) => { /* keydown - when someone clicks a key */
    switch (e.code){ /* code - is a property of events (e) */
        case 'ArrowUp' :
            player.speedY -=1.5;
            break;
        case 'ArrowDown' :
            player.speedY +=1.5;
            break;
        case 'ArrowRight' :
            player.speedX +=1.5;
            break;
        case 'ArrowLeft' :
            player.speedX -=1.5;
            break;
    }
})


document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0
});
  