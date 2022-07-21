const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const cWidth = canvas.width;
const cHeight = canvas.height; 


const player = new Component(70, 70, './docs/assets/images/griffyndor_seeker.png', 450, 300, ctx);

/* const energyOne = new Component (40, 30, './docs/assets/images/bolt.png', 790, 70, this.ctx); */


/* Creating the game */
let game;

/* HOME PAGE - GAME */

let audioTag = new Audio ("./docs/assets/sounds/mainSound.mp3")
    
window.addEventListener('load', () => {
    
    if (!game) {
    
    audioTag.play();
    audioTag.loop = true;
    
    }

    
})


/* start game with button */

const startBtn = document.getElementById('start');

startBtn.addEventListener('click', () => {
    if (!game){
/* toggle example for the background         
canvas.classList.remove('first-background')
        canvas.classList.add('second-background') */
        game = new Game (ctx, cWidth, cHeight, player);
        game.start();
        audioTag.pause();

        
        
    }

    else if (game && !game.isRunning) {
        /* when crashed */
        game.reset();
    }
    
})

/* PAUSE GAME */

/* const pauseBtn = document.getElementById('pause');

pauseBtn.addEventListener('click', () => {
    if (game && game.isRunning) {
        game.pause();
    } */
    
/* }); */

/* LEVEL BUTTON */

const levelBtn = document.getElementById('level');

levelBtn.addEventListener('click', () => {
    const element = document.getElementById('popUp');
    element.classList.toggle('hidden');

    ctx.clearRect(0, 0, cWidth, cHeight)
    
});

const beginnerBtn = document.getElementById('beginner');

beginnerBtn.addEventListener('click', () => {
    const element = document.getElementById('popUp');
    element.classList.toggle('hidden');
    
    ctx.font = '24px fantasy';
    ctx.fillStyle = 'black';
    ctx.fillText(`You chose beginner level!`, 280, 80);

    console.log('beginner level');
});

const expertBtn = document.getElementById('expert');

expertBtn.addEventListener('click', () => {
    const element = document.getElementById('popUp');
    element.classList.toggle('hidden');

    ctx.font = '24px fantasy';
    ctx.fillStyle = 'black';
    ctx.fillText(`You chose expert level!`, 280, 80);

    console.log('expert level');

});


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
        /* case 'Space' :
            drawMagic(); */
    }
})


document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0
});
  