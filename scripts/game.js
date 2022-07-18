class Game {
    constructor(ctx, width, height, player){
        this.frames = 0; 
        this.points = 0;
        
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.goalBonus = [];
        this.obstacles = [];
        this.interval = null;
        this.isRunning = false;
}


start () {
    
    this.interval = setInterval(this.updateGameArea, 20)
    this.isRunning = true;
    }

reset = () => {
    this.player.x = 0; 
    this.player.y = 110;
    this.frames = 0;
    this.mainObstacle = [];
    this.obstacles = [];
    this.goalBonus = [];
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


/* Bonus points*/

updateBonus(){
    for (let h = 0; h < this.goalBonus.length; h++){
        this.goalBonus[h].x -= 1;
        /* this.goalBonus[h].y += 3; */
        this.goalBonus[h].draw();
    }
    //this.frames += 0.5;

    if (this.frames % 120 === 0){ 
        let x = this.width;
        let minX = 20;
        let maxX = 900;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 20;
        let maxY = 500;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        this.goalBonus.shift();
        this.goalBonus.push (new Component(30, 30, 'blue', newX , newY, this.ctx));
        
        
    }
}    

/* Obstacles */

updateSnitch () {
    /* To move and draw the obstacles */
    for (let j = 0; j < this.obstacles.length; j++){
        this.obstacles[j].x -= 1;
        this.obstacles[j].draw();
    }
    

    if (this.frames % 30 === 0){ /* to increanse/decrease speed of obstacle 1 second = 60 fps */
        let x = this.width;
        let minX = 20;
        let maxX = 900;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 20;
        let maxY = 500;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        this.obstacles.shift();
        this.obstacles.push (new Snitch(30, 30, 'green', newX , newY, this.ctx));/* the width and the y is fixed */
        
    }

   
}    

/* SCORING */

/* when the snitch is catched; check the points to choose a winner, only score once when they crash */
checkGameOver = () => {
    const snitchCatch = this.obstacles.some((obstacle) => { /* if anything inside the array and checks what we're asking */
    
    return this.player.crashWith(obstacle);
    });

    const bonusCatch = this.goalBonus.some((goal) => { /* if anything inside the array and checks what we're asking */
    return this.player.crashWith(goal);
    
    });

    
    if (snitchCatch) {
        
        this.points += 150;
        /* this.stop(); */
}

    else if (bonusCatch) {
        this.points += 10;

    }
}

playerScore(){
   
    this.ctx.font = '24 sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`My Score: ${this.points}`, 100, 50);
    

}

enemyScore (){
    const enemyPoints = (Math.floor(this.frames/(60*5)))*10;
    this.ctx.font = '24 sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Enemy Score: ${enemyPoints}`, 200, 50);
    
}

/* TIMER */

timer () {
    const seconds = 60 - (Math.floor(this.frames/60));
    /* this.timer -= seconds; */
    this.ctx.font = '24 sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Time left: ${seconds}`, 700, 50);

}

/* CONTROLLER */

updateGameArea = () => { 
    
    this.clear();
    this.frames += 1;
    this.enemyScore();
    this.playerScore();
    this.timer();
    this.updateBonus();
    this.updateSnitch();
    this.checkGameOver();
    this.player.newPos();
    this.player.draw ();
   
    
    }
}