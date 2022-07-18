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
    constructor(width, height, color, x, y, ctx){
        super(width, height, color, x, y, ctx);
        
    }

    draw() {
        const img = new Image();
        img.addEventListener('load', function(){
        ctx.drawImage (img, this.x, this.y, 50, 50);
        })
    img.src = "./docs/assets/images/final_snitch.png"; 
    
    
    } 
    }



