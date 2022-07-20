class Game {
    constructor(ctx, width, height, player){
        this.frames = 0; 

        this.points = 0;
        this.enemyPoints = 0;
        this.timer = 60;
       

        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.player = player;
        this.goalBonus = [];
        this.obstacles = [];
        this.messages = [];
        this.enemyPlayer = [];

        this.interval = null;
        this.snitchCatched = false;
        this.isRunning = false;
        
}



start () {
    
    this.interval = setInterval(this.updateGameArea, 20)
    this.snitchCatched = false;
    this.isRunning = true;
    }

reset = () => {
    this.player.x = 450; 
    this.player.y = 300;

    this.enemyPoints = 0;
    this.points= 0;
    this.timer = 60;
    this.frames = 0;
    this.snitchCatched = false;
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
        this.goalBonus[h].y -= 3; 
        this.goalBonus[h].draw();
    }
    

    if (this.frames % 120 === 0){ 
        let x = this.width;
        let minX = 20;
        let maxX = 900;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 20;
        let maxY = 500;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        this.goalBonus.shift();
        this.goalBonus.push (new Component(30, 30, 'docs/assets/images/quiditch_ball.png', newX , newY, this.ctx));
        
        
    }
} 


/* Obstacles */

updateSnitch () {
    /* To move and draw the obstacles */
    for (let j = 0; j < this.obstacles.length; j++){
        this.obstacles[j].x -= 1;
        this.obstacles[j].y -= 3;
        this.obstacles[j].draw();
    }
    

    if (this.frames % 60 === 0){ 
       
        let x = this.width;
        let minX = 50;
        let maxX = 900;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 20;
        let maxY = 550;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        
        this.obstacles.shift();
        this.obstacles.push (new Component(40, 40,'docs/assets/images/final_snitch.png', newX , newY, this.ctx));
        }
}

updateEnemy () {
    /* To move and draw the obstacles */
    for (let j = 0; j < this.enemyPlayer.length; j++){
        this.enemyPlayer[j].x -= 1;
        this.enemyPlayer[j].y -= 1;
        this.enemyPlayer[j].draw();
    }
    

    if (this.frames % 180 === 0){ 
       
        let x = this.width;
        let minX = 50;
        let maxX = 900;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 20;
        let maxY = 550;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        
        this.enemyPlayer.shift();
        this.enemyPlayer.push (new Component(70, 70,'docs/assets/images/slytherin_player.png', newX , newY, this.ctx));
        }
}




/* GAME RESULTS */


checkGameOver = () => {
    if (this.snitchCatched === true || this.timer === 0) {
        this.stop();
    }
}

results = () => {

    if (!this.isRunning && this.points > this.enemyPoints) {
        
        this.ctx.font = '34 sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`You won!`, 450, 300);
        console.log('you won');
    }

    else if (!this.isRunning && this.points < this.enemyPoints) {
        this.ctx.font = '34 sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`You lost!`, 450, 300);
    }

    else if (!this.isRunning && this.points === this.enemyPoints) {
        this.ctx.font = '34 sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`it's a tie!`, 450, 300);
    }

    

    }

displayResults (){
    setTimeout(this.results,5000);
}



/* SCORING */

playerScore = () => {
        const snitchCatch = this.obstacles.some((obstacle) => { 
    
        return this.player.crashWith(obstacle);
        });
    
        const bonusCatch = this.goalBonus.some((goal) => { 
        return this.player.crashWith(goal);
        
        });
    
        
        if (snitchCatch) {
            
            this.points += 150;
            this.snitchCatched = true;
            this.ctx.font = '34 sans-serif';
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(`You catched the snitch!`, 450, 50);

            }

        else if (bonusCatch) {
                this.points += 10;
                this.goalBonus = [];

                /* Popups.displayGoals(); */
                
        }

        

    this.ctx.font = '24 sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`My Score: ${this.points}`, 100, 50);
    

}

enemyScore (){
    const enemyPoints = (Math.floor(this.frames/(60*2)))*10;

    this.ctx.font = '24 sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Enemy Score: ${enemyPoints}`, 200, 50);

    this.enemyPoints = enemyPoints;

    /* if (this.enemyPoints % 10 === 0 && this.enemyPoints > 0){
        this.ctx.font = '34 sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Enemy scored :(`, 200, 100);
        

    }  */
    
}

/* TIMER */

gameTimer () {
    const seconds = 35 - (Math.floor(this.frames/60));
    this.ctx.font = '24 sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Time left: ${seconds}`, 700, 50);

    if (seconds === 0){
        this.timer = 0;
    }
    
}

/* CONTROLLER */

updateGameArea = () => { 
    
    this.clear();
    this.frames += 1;
    this.enemyScore();
    this.playerScore();
    this.gameTimer();
    this.updateEnemy();
    this.updateBonus();
    this.updateSnitch();
    this.checkGameOver();
    this.displayResults();
    this.player.newPos();
    this.player.draw ();
   
    
    }
}