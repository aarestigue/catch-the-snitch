class Component {
    constructor(width, height, src, x, y, ctx){
        this.width = width;
        this.height = height;
        
        this.x = x;
        this.y = y;
        this.ctx = ctx; 
        this.speedX = 0;
        this.speedY = 0;
        const img = new Image();
        img.addEventListener('load', () => {})
        img.src = src; 
        this.img = img;
    }

    /* Acceleration */

    newPos(){
        /* this.x = (this.x + this.speedX) % 1000;
        this.y = (this.y + this.speedY) % 500; */
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

class Messages {
    constructor(text, font,  x, y, ctx){
        
        
        this.x = x;
        this.y = y;
        this.ctx = ctx; 
        this.speedX = 1;
        this.speedY = 1;
        this.text = text;
        this.font = font;
    }

    newPos(){
        
        this.x += this.speedX;
        this.y -= this.speedY;
    }

    draw(){
        ctx.font = this.font; 
        ctx.fillText(this.text, this.x, this.y);
        
    } 

}  






