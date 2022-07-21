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
        this.playerEnergy = [];
        

        this.enemyPlayer = null;
        this.snitch = null;
        this.interval = null;
        this.playerHasEnergy = false;
        this.snitchCatched = false;
        this.isRunning = false;

        this.message = ''
        this.messageTimer = 0;
        
}



start = () => {
    
    this.interval = setInterval(this.updateGameArea, 1000/60)
    this.snitchCatched = false;
    this.playerHasEnergy = true;
    this.isRunning = true;
    /* this.snitch = new Component(40, 40,'docs/assets/images/final_snitch.png', Math.floor(Math.random() * this.width) ,Math.floor( Math.random() * this.height), this.ctx) */
    this.enemyPlayer = new Component(70, 70,'docs/assets/images/slytherin_player.png', Math.floor(Math.random() * this.width) ,Math.floor( Math.random() * this.height), this.ctx)
    this.createEnergy();
    
    }
    

reset = () => {
    this.player.x = 450; 
    this.player.y = 300;

    this.enemyPoints = 0;
    this.background = 
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


/* Energy */
createEnergy(){
    this.playerEnergy.push( new Component (40, 30, 'docs/assets/images/bolt.png', 790, 70, this.ctx))

    this.playerEnergy.push(new Component (40, 30, 'docs/assets/images/bolt.png', 820, 70, this.ctx))


    this.playerEnergy.push(new Component (40, 30, 'docs/assets/images/bolt.png', 850, 70, this.ctx))

}

updateEnergy(){
    this.playerEnergy.forEach((energy) => {
        energy.draw()
    })
}
/* Bonus points*/

updateBonus(){
    for (let h = 0; h < this.goalBonus.length; h++){
        this.goalBonus[h].x -= 2;
        this.goalBonus[h].y -= 3; 
        this.goalBonus[h].draw();
    }
    

    if (this.frames % 180 === 0){ 
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

    /* this.snitch.speedX *= 1.1;
    this.snitch.speedY *= 0.9;

    //horizontal
    if(this.snitch.x < 20) {
        this.snitch.x += 0.5;
    } else if (this.snitch.x > 900) {
        this.snitch.x -= 0.5;
    }

    //vertically
    if(this.snitch.y < 50) {
        this.snitch.y += 0.4;
    } else {
        this.snitch.y -= 0.4;
    }

    this.snitch.draw(); */
    
    /* To move and draw the obstacles */
     for (let j = 0; j < this.obstacles.length; j++){
     this.obstacles[j].x += 3; 
     this.obstacles[j].y += 2; 
     this.obstacles[j].draw(); 
    } 
    

    if (this.frames % 60 === 0){   

        let x = this.width;
        let minX = 100;
        let maxX = 800;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 100;
        let maxY = 450;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        
        this.obstacles.shift();
        this.obstacles.push (new Component(40, 40,'docs/assets/images/final_snitch.png', newX , newY, this.ctx));
        }
}

updateEnemy () {
    /* To move and draw the obstacles */
    
        //horizontal
        if(this.enemyPlayer.x < this.player.x) {
            this.enemyPlayer.x += 1;
        } else {
            this.enemyPlayer.x -= 0.8;
        }
        //vertically
        if(this.enemyPlayer.y < this.player.y) {
            this.enemyPlayer.y += 1;
        } else {
            this.enemyPlayer.y -= 0.8;
        }

        this.enemyPlayer.draw();
    

}




/* GAME RESULTS */


checkGameOver = () => {
    if (this.snitchCatched === true || this.timer === 0 || !this.playerHasEnergy) {
        this.stop();
    }

}

results = () => {

    if (!this.isRunning && this.points > this.enemyPoints) {
        
        this.ctx.font = '24px  sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`You won!`, 450, 300);
        console.log('you won');
    }

    else if (!this.isRunning && this.points < this.enemyPoints) {
        this.ctx.font = '24px sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`You lost!`, 450, 300);
    }

    else if (!this.isRunning && this.points === this.enemyPoints) {
        this.ctx.font = '24px sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`it's a tie!`, 450, 300);
    }

    

    }

displayResults (){
    setTimeout(this.results,5000);
}





/* SCORING */

playerScore = () => {
    
   /*  const snitchCatch = this.player.crashWith(this.snitch); */

    const snitchCatch = this.obstacles.some((obstacle) => { 
        return this.player.crashWith(obstacle);
        
        });
    
        const bonusCatch = this.goalBonus.some((goal) => { 
        return this.player.crashWith(goal);
        
        });
    
        
        if (snitchCatch) {
            
            this.points += 150;
            this.snitchCatched = true;
            this.ctx.font = '20px sans-serif';
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(`You catched the snitch!`, 450, 50);

            }

        else if (bonusCatch){
                this.points += 10;
                this.goalBonus = [];
                this.message = 'You caught a bonus';
                this.messageTimer = 120;

                /* Popups.displayGoals(); */
                
        }
        

    this.ctx.font = '20px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`My Score: ${this.points}`, 50, 50);
    

}

enemyScore (){
    const enemyPoints = (Math.floor(this.frames/(60*2)))*10;

    this.ctx.font = '20px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Enemy Score: ${enemyPoints}`, 200, 50);

    this.enemyPoints = enemyPoints;

    /* if (this.enemyPoints % 10 === 0 && this.enemyPoints > 0){
        this.ctx.font = '34 sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Enemy scored :(`, 200, 100);
        

    }  */
    
}

checkSeeker = () => {

    const playersCrush = this.player.crashWith(this.enemyPlayer);

    if (playersCrush) {
        this.player.x = 100;
        this.enemyPlayer.x = 600
        this.playerEnergy.pop()
        
    }

    else if (this.playerEnergy.length === 0){
        
        return this.playerHasEnergy = false;
    }
    
}



/* TIMER */

gameTimer () {
    
    const seconds = 35 - (Math.floor(this.frames/60));
    
    /* this.timer -= (Math.floor(this.frames/60)); */

    

    this.ctx.font = '24 sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Timer: ${seconds}`, 750, 50);

    if (seconds === 0){
        this.timer = 0;
    }

    
}

      
checkMessages(){
    if(this.message && this.messageTimer){
        this.ctx.fillText(this.message, 50, 100)
        this.messageTimer--
    }
}

/* SOUNDS */

/* mainSound() {

    let audioTag = new Audio ("./docs/assets/sounds/mainSound.mp3")
    
    audioTag.play();
    audioTag.loop = true;
    
} */
/* CONTROLLER */

updateGameArea = () => { 
    
    this.clear();
    this.frames += 1;
    this.enemyScore();
    this.playerScore();
    this.gameTimer();
    

    this.updateEnemy();
    this.updateBonus();
    this.updateEnergy();
    /* this.drawEnergy(); */
    this.updateSnitch();
    this.checkMessages()
    this.checkSeeker();
    this.checkGameOver();
    this.displayResults();
    this.player.newPos();
    this.player.draw ();
   
    
    }
}