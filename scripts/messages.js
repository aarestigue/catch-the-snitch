/* class Popups {

displayGoals () {
        
    
    console.log ('you scored!!');
    this.messages.shift();
    this.messages.push (new Messages('You scored!', '15px serif', 30, 80, this.ctx));

    for (let j = 0; j < 1000; j++){
        this.messages[j].x -= 1;
        this.messages[j].y += 1;
        this.messages[j].draw();
    }
    


setTimeout(this.updateGameArea, 120000);
}

} */



    