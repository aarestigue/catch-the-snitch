class Component {
    constructor(width, height, color, x, y, ctx){
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.ctx = ctx; 
        this.speedX = 0;
        this.speedY = 2;
    }

    /* Acceleration */

    newPos(){
        /* this.x = (this.x + this.speedX) % 1000;
        this.y = (this.y + this.speedY) % 500; */
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    /* collitions */

    left(){ /* the x marks the left side */
        return this.x;
    }

    right() {
        return this.x + this.width
    }

    top(){
        return this.y;
    }

    bottom(){
        return this.y+this.height;
    }

    crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || 
        this.top() > obstacle.bottom()  || 
        this.right() < obstacle.left()  || 
        this.left() > obstacle.right()  
        ); 
    }
}

class Snitch extends Component {
    constructor(width, height, color, x, y, ctx, gravity){
        super(width, height, color, x, y, ctx);

        this.gravity = 0.5;
        this.ctx = ctx; 
        this.x = x;
        this.y = y;
        this.speedX = 2;
        this.speedY = 2;
        
    }

    newPos(){
        /* this.x = (this.x + this.speedX) % 1000;
        this.y = (this.y + this.speedY) % 500; */
        this.x += this.speedX;
        this.y += this.speedY;
    }

}







    /* updateSnitch() {
        
        ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
        
        snitch.draw();
    
        this.snitch.x -= 1; */
        /* this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY; */
    
        /* this.frames += 1;
    
    if (this.frames % 30 === 0){ /* to increanse/decrease speed of obstacle 1 second = 60 fps */
    
    
    /* let minX = 20;
    let maxX = 900;
    
    let newX = Math.floor(Math.random()* (maxX - minX + 1)+ minX);
    
    let minY = 20;
    let maxY = 500;
    
    let newY = Math.floor(Math.random()* (maxY - minY + 1)+ minY); 
    
    
    if (this.y + this.speedY > this.ctx.height || this.y + this.speedY < 0) {
            this.speedY *= -1;
          }
    if (this.x + this.speedX > canvas.width || this.x + this.speedX < 0) {
            this.speedX *= -1;
          } */
      
  