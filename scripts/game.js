class Game {
    constructor(ctx, width, height, player){
        this.frames = 0; /* For TIME MEASURE : frames: is easier than using miliseconds in the interval,
        we loop in between frames */
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
       
        this.obstacles = [];
        this.interval = null;
        this.isRunning = false;
}

/* STEP 1 _ start the game and the intervals! */
start () {
    /* almost every game is storaged inside a interval (loop), it's gonna update the game
    continuosly and we choose 20 centiseconds as an OK time */
    this.interval = setInterval(this.updateGameArea, 20)
    this.isRunning = true;
    }

reset = () => {
    this.player.x = 0; 
    this.player.y = 110;
    
    this.frames = 0;
    this.mainObstacle = [];
    this.obstacles = [];
    this.start();
}    

clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    }

stop () {
    clearInterval(this.interval);
    this.isRunning = false;
}

/* To create Obstacles */   

updateSnitch () {
    for (let k = 0; k < this.mainObstacle.length; k++){
        this.mainObstacle[k].x -= 1;
        this.mainObstacle[k].draw();
}
this.frames += 1;

if(this.frames % 120 === 0){
let minX = 10;
let maxX = 900;    
let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);
this.mainObstacle.push (new Component(30, 30, 'blue', newX, 500, this.ctx));
}

}

updateSnitch () {
    /* To move and draw the obstacles */
    for (let j = 0; j < this.obstacles.length; j++){
        this.obstacles[j].x -= 1;
        this.obstacles[j].draw();
    }
    this.frames += 1.5;

    if (this.frames % 30 === 0){ /* to increanse/decrease speed of obstacle 1 second = 60 fps */
        let x = this.width;
        let minX = 20;
        let maxX = 900;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 20;
        let maxY = 500;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        this.obstacles.shift();
        this.obstacles.push (new Component(30, 30, 'green', newX , newY, this.ctx));/* the width and the y is fixed */
        
    }
}    

checkGameOver = () => {
    const crashed = this.obstacles.some((obstacle) => { /* if anything inside the array and checks what we're asking */
    return this.player.crashWith(obstacle);
    });

    if (crashed) {
        this.stop();
    }
}

score(){
    const points = Math.floor(this.frames/5);
    this.ctx.font = '24 sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Score: ${points}`, 850, 50);

}

updateGameArea = () => { /* to access a function outside the method, we use arrow */
    
    this.clear();
    /* we could call a function for the backgroud here; in case we need to change it */
    this.score();
    this.updateSnitch();
    this.checkGameOver();
    this.player.newPos();
    this.player.draw ();
    
    }
}