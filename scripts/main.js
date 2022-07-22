const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const cWidth = canvas.width;
const cHeight = canvas.height; 




let playerDirection;
let useMagic = false;


const player = new Component(100, 80, './docs/assets/images/player_right.png', 50, 200, ctx);


/* const energyOne = new Component (40, 30, './docs/assets/images/bolt.png', 790, 70, this.ctx); */


/* Creating the game */
let game;

/* HOME PAGE - GAME */

let audioTag = new Audio ("./docs/assets/sounds/mainSound.mp3")
    
window.onload =  () => {
    if (!game) {
    audioTag.play();
    audioTag.loop = true;
    }   
}

/* SOUNDS: YOU WON THE GAME */

let audioVictory = new Audio ("./docs/assets/sounds/victory.mp3");

let magicSound = new Audio ("./docs/assets/sounds/spell_sound.mp3");
    
/* window.onload =  () => {
    if (!game) {
    audioTag.play();
    audioTag.loop = true;
    }   
} */
/* START BUTTON */

const startBtn = document.getElementById('start');

startBtn.addEventListener('click', () => {
    if (!game){

        game = new Game (ctx, cWidth, cHeight, player);
        game.start();
        audioTag.pause();
        canvas.classList.remove('first-background');
        canvas.classList.add('second-background');

        
        
    }

    else if (game && !game.isRunning) {
        /* when crashed */
        game.reset();
    }
    
})

/* STOP BUTTON */

const stopBtn = document.getElementById('stop');

stopBtn.addEventListener('click', () => {
    if (game){

        game.clear();
        game.stop();
        audioVictory.pause();
        
        audioTag.play();
        /* canvas.classList.remove('second-background');
        canvas.classList.add('first-background'); */

        
        
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
let difficulty = 0;

beginnerBtn.addEventListener('click', () => {
    const element = document.getElementById('popUp');
    element.classList.toggle('hidden');

    difficulty = 0; 
    
    ctx.font = '24px fantasy';
    ctx.fillStyle = 'black';
    ctx.fillText(`You chose beginner level!`, 280, 80);

    
});

const expertBtn = document.getElementById('expert');

expertBtn.addEventListener('click', () => {
    const element = document.getElementById('popUp');
    element.classList.toggle('hidden');

    difficulty = 1;

    ctx.font = '24px fantasy';
    ctx.fillStyle = 'black';
    ctx.fillText(`You chose expert level!`, 280, 80);

    

});


/* KEYS */



document.addEventListener('keydown', (e) => { /* keydown - when someone clicks a key */
    switch (e.code){ /* code - is a property of events (e) */
        case 'ArrowUp' :
            player.speedY -=1;
            playerDirection= 'up';
            break;
        case 'ArrowDown' :
            player.speedY +=1;
            playerDirection = 'down';
            break;
        case 'ArrowRight' :
            player.speedX +=1.1;
            playerDirection = 'right';
            
            break;
        case 'ArrowLeft' :
            player.speedX -=1.1;
            playerDirection = 'left';
            break;

        case 'Space' :
        
        useMagic = true;
        game.attackEnemy();
        
        break;
    }
})


document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0
    
});
  