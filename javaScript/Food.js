class Food{
    constructor(_x,_y,_r){
        this.location = new createVector(_x,_y);
        this.r = _r;
        this.color = color(255, 255, 0);
    }

    display(){
        fill(this.color);
        //strokeWeight(2);
        //stroke(255,0,0,100);
        noStroke();
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