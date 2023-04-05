class Food{
    constructor(_x,_y,_r){
        this.location = new createVector(_x,_y);
        this.r = _r;
        this.color = color(255, 100, 100);
    }

    display(){
        fill(this.color);
        circle(this.location.x,this.location.y,this.r);
    }

    changeColor(c){
        this.color = c;
    }
    
    isEaten(otherLocation,size){ //return a bool
        let distance = this.location.dist(otherLocation);
        return(distance<(this.size/s+sizs/2));
    }

}