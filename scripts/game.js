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
        this.playerMagic = [];
        this.magicBonus = [];
        

        this.enemyPlayer = null;
        this.dementor = null;
        this.snitch = null;
        this.interval = null;
        this.playerHasEnergy = false;
        this.snitchCatched = false;
        this.isRunning = false;
        this.difficulty = difficulty;
        this.playerDirection = playerDirection;
        this.useMagic = useMagic;

        this.message = '';
        this.messageTimer = 0;

        this.wand = '';
        this.wandTimer = 0;
        this.wandDirection = '';

        this.audioVictory = audioVictory;
        this.magicSound = magicSound;
        
}



start = () => {
    
    this.interval = setInterval(this.updateGameArea, 1000/60)
    this.snitchCatched = false;
    this.playerHasEnergy = true;
    this.isRunning = true;
    /* this.snitch = new Component(40, 40,'docs/assets/images/final_snitch.png', Math.floor(Math.random() * this.width) ,Math.floor( Math.random() * this.height), this.ctx) */
    
    this.enemyPlayer = new Component(70, 70,'docs/assets/images/slytherin_player.png', 400 , 350, this.ctx)
    this.createEnergy();
    this.createMagic();

    if (this.difficulty === 1){
        
        this.dementor =  new Component(70, 70,'docs/assets/images/dementor.png', 410, 150, this.ctx)  
    }
    
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
    audioVictory.pause();
    audioTag.play();
    clearInterval(this.interval);
    this.isRunning = false;
}

/* To create Obstacles */   


/* ENERGY */

createEnergy(){
    this.playerEnergy.push( new Component (40, 30, 'docs/assets/images/bolt.png', 650, 70, this.ctx))

    this.playerEnergy.push(new Component (40, 30, 'docs/assets/images/bolt.png', 670, 70, this.ctx))


    this.playerEnergy.push(new Component (40, 30, 'docs/assets/images/bolt.png', 690, 70, this.ctx))

}

updateEnergy(){
    this.playerEnergy.forEach((energy) => {
        energy.draw()
    })
}

/* MAGIC */

/* getMagic(){

    if (this.difficulty === 1){
    for (let h = 0; h < this.magicBonus.length; h++){
        this.magicBonus[h].x -= 0;
        this.magicBonus[h].y += 3; 
        this.magicBonus[h].draw();
    }
    

    if (this.frames % 360 === 0){ 
        let x = this.width;
        let minX = 20;
        let maxX = 450;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 20;
        let maxY = 500;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        this.magicBonus.shift();
        this.magicBonus.push (new Component(30, 30, 'docs/assets/images/magicb.png', newX , 0, this.ctx));
        
        
    }
  }
}  */

createMagic(){

    if (this.difficulty === 1){

    let x = 650;
    let newX = x + this.playerMagic.length;
        
    this.playerMagic.push( new Component (40, 30, 'docs/assets/images/wand_bonus.png', 650, 110, this.ctx));
    this.playerMagic.push(new Component (40, 30, 'docs/assets/images/wand_bonus.png', 670, 110, this.ctx));
    this.playerMagic.push(new Component (40, 30, 'docs/assets/images/wand_bonus.png', 690, 110, this.ctx));

    
    }

    else {

    }
}

updateMagic(){

    if (this.difficulty === 1){
    this.playerMagic.forEach((magic) => {
        magic.draw()
    })
}

}

attackEnemy () {
    let distanciaMax = this.player.y + 30;
    let distanciaMin = this.player.y - 30;

    let pushEnemyForward = this.player.x + 400;
    let pushEnemyBack = this.player.x - 400;

    



    if (this.difficulty === 1 && this.playerMagic.length > 0){

        /* Attack dementor */
        if(this.dementor.y < distanciaMax || this.dementor.y > distanciaMin){
            if(this.dementor.x > this.player.x) {
                this.dementor.x = pushEnemyForward;
                this.dementor.y = 200;

                this.wand = 'true';
                this.wandTimer = 30;  
                this.wandDirection = 'right';

                this.magicSound.play();
                
            }    

            else if (this.dementor.x < this.player.x){
                this.dementor.x = pushEnemyBack;
                this.dementor.y = 200;
                
                this.wand = 'true';
                this.wandTimer = 30;  
                this.wandDirection = 'left';

                this.magicSound.play();
                
            }
        }

        /* Attack enemy player */

        if(this.enemyPlayer.y < distanciaMax || this.enemyPlayer.y > distanciaMin){
            if(this.enemyPlayer.x > this.player.x) {
                this.enemyPlayer.x = pushEnemyForward;
                this.enemyPlayer.y = 200;
                
                this.wand = 'true';
                this.wandTimer = 30;  
                this.wandDirection = 'right';

                this.magicSound.play();
                
            }    

            else if (this.enemyPlayer.x < this.player.x){
                this.enemyPlayer.x = pushEnemyBack;
                this.enemyPlayer.y = 200;
                
                this.wand = 'true';
                this.wandTimer = 30;  
                this.wandDirection = 'left';

                this.magicSound.play();
            }
        }

        this.playerMagic.pop();
    }

}

/* BONUS*/

updateBonus(){
    for (let h = 0; h < this.goalBonus.length; h++){
        this.goalBonus[h].x -= 0;
        this.goalBonus[h].y += 3; 
        this.goalBonus[h].draw();
    }
    

    if (this.frames % 560 === 0){ 
        let x = this.width;
        let minX = 20;
        let maxX = 900;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 20;
        let maxY = 500;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        this.goalBonus.shift();
        this.goalBonus.push (new Component(30, 30, 'docs/assets/images/quiditch_ball.png', newX , 0, this.ctx));
        
        
    }
} 


/* Obstacles */

updateSnitch () {

    
     for (let j = 0; j < this.obstacles.length; j++){
     
     
    /* horizontal */
        if ( this.obstacles[j].x < this.player.x ){
            this.obstacles[j].y -=0.1;
         }
         else if ( this.obstacles[j].x > this.player.x ){
            this.obstacles[j].y +=0.1;
         }

     

      /* vertical */
      if ( this.obstacles[j].y < this.player.y ){
        this.obstacles[j].y +=0.5;
     }
      else if ( this.obstacles[j].y > this.player.y ){
        this.obstacles[j].y -=0.5;
     }

     
     this.obstacles[j].draw(); 
    } 
    

    if (this.frames % 60 === 0){   

        let x = this.width;
        let minX = 400;
        let maxX = 800;
        let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);

        let minY = 30;
        let maxY = 350;

        let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 

        
        this.obstacles.shift();
        this.obstacles.push (new Component(40, 40,'docs/assets/images/final_snitch.png', newX , newY, this.ctx));
        }
}

updateEnemy () {
    

/* EXPERT LEVEL */

    if (this.difficulty=== 1) {
        console.log('expert');
        //horizontal
        if(this.enemyPlayer.x < this.player.x) {
            this.enemyPlayer.x += 1.1;
        } else {
            this.enemyPlayer.x -= 1.1;
        }
        //vertically
        if(this.enemyPlayer.y < this.player.y) {
            this.enemyPlayer.y += 1.1;
        } else {
            this.enemyPlayer.y -= 1.1;
        }

        this.enemyPlayer.draw();
    }

 /* BEGINNER LEVEL */   

    else if (this.difficulty===0) {

        console.log('easy');
    
        //horizontal
        if(this.enemyPlayer.x < this.player.x) {
            this.enemyPlayer.x += 0.8;
        } else {
            this.enemyPlayer.x -= 0.8;
        }
        //vertically
        if(this.enemyPlayer.y < this.player.y) {
            this.enemyPlayer.y += 0.8;
        } else {
            this.enemyPlayer.y -= 0.8;
        }

        this.enemyPlayer.draw();
    

}
}

updateDementor (){

    /* EXPERT LEVEL */
    if (this.difficulty === 1){

        //horizontal
        if(this.dementor.x < this.player.x) {
            this.dementor.x += 0.3;
        } else {
            this.dementor.x -= 0.3;
        }
        //vertically
        if(this.dementor.y < this.player.y) {
            this.dementor.y += 0.3;
        } else {
            this.dementor.y -= 0.3;
        }

        this.dementor.draw();
    }

    /* BEGINNER LEVEL */

    else {
       
    }
    
}



/* GAME RESULTS */


checkGameOver = () => {
    if (this.snitchCatched === true || this.timer === 0 || !this.playerHasEnergy) {
        this.stop();
        this.ctx.classList.remove('second-background');
        this.ctx.classList.add('third-background');
    }

}

results = () => {

    if (!this.isRunning && this.points > this.enemyPoints) {
        
        this.ctx.font = '24px  sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`You won!`, 350, 250);
        console.log('you won');

        this.audioVictory.play();
        this.audioVictory.loop = true;

        this.ctx.classList.remove('second-background');
        this.ctx.classList.add('third-background');

        

    }

    else if (!this.isRunning && this.points < this.enemyPoints) {
        this.ctx.font = '24px sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`You lost!`, 350, 250);
    }

    else if (!this.isRunning && this.points === this.enemyPoints) {
        this.ctx.font = '24px sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`it's a tie!`, 350, 250);
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
            this.ctx.font = '16px sans-serif';
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(`You catched the snitch!`, 400, 50);

            }

        else if (bonusCatch){
                this.points += 10;
                this.goalBonus = [];
                this.message = 'You caught a bonus!';
                this.messageTimer = 120;

                /* Popups.displayGoals(); */
                
        }
        

    this.ctx.font = '16px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Gryffindor: ${this.points}`, 50, 50);
    

}

enemyScore (){
    const enemyPoints = (Math.floor(this.frames/(60*2)))*10;

    this.ctx.font = '16px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Slytherin: ${enemyPoints}`, 200, 50);

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

        this.player.x = 20;
        this.player.y = 200;
        this.enemyPlayer.x = 500;
        this.playerEnergy.pop()
        
    }

    else if (this.playerEnergy.length === 0){
        
        return this.playerHasEnergy = false;
    }
    
}

checkDementor = () => {

    if (this.difficulty === 1){

    const dementorCrush = this.player.crashWith(this.dementor);

    if (dementorCrush) {

        this.player.x = 20;
        this.player.y = 200;
        this.dementor.x = 400;
        this.playerEnergy.pop()
        
    }

    else if (this.playerEnergy.length === 0){
        
        return this.playerHasEnergy = false;
    }
}
    
}

checkMagicBonus = () => {

    const magicCatched = this.magicBonus.some((magic) => { 
        return this.player.crashWith(magic);
        
        });

        if (magicCatched) {
            console.log('catched magic')
            this.createMagic();
            this.updateMagic();

            this.player.x= 200;
            this.player.y=300;
        }

    }


/* TIMER */

gameTimer () {
    
    const seconds = 35 - (Math.floor(this.frames/60));
    
    /* this.timer -= (Math.floor(this.frames/60)); */

    

    this.ctx.font = '20 sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Timer: ${seconds}`, 600, 50);

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

/* Wand time in screen */
checkWands(){
    if(this.wand && this.wandTimer){
        let wandX = this.player.x + 60;
        let wandY = this.player.y + 30;

        if (this.wandDirection = 'right'){
        const newWand = new Component(40, 20,'docs/assets/images/wand_right_attack.png', wandX, wandY, this.ctx);
        newWand.draw();
        this.wandTimer--
        console.log('right wand');
        }

        else if (this.wandDirection = 'left'){
            const newWand = new Component(40, 20,'docs/assets/images/wand_left_attack.png', wandX, wandY, this.ctx);
            newWand.draw();
            this.wandTimer--
        }
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
    
    this.updateDementor();
    this.updateEnemy();
    this.updateBonus();
    /* this.getMagic(); */
    
    this.updateEnergy();
    this.updateSnitch();
    this.updateMagic();

    /* this.attackEnemy(); */

    this.checkMessages();
    this.checkWands();
    this.checkSeeker();
    this.checkGameOver();
    this.checkMagicBonus();
    this.checkDementor();
    this.displayResults();

    
    this.player.newPos();
    this.player.draw (); 
    
     }
}