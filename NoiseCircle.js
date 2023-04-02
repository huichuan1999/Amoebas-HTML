class NoiseCircle {
  constructor(_x, _y, _br, zoffUpdate, noiseMax) {
    this.location = new createVector(_x,_y);
    //the basic r
    this.br = _br;
    this.color = color(27, 89, 31);
    this.coreColor = color(255,0,0);
    this.velocity = new createVector(random(-0.7, 0.7),random(-0.7, 0.7))
    this.zoffUpdate = zoffUpdate;
    this.noiseMax = noiseMax;

    this.desired = new createVector(0, 0);
    this.friction = new createVector(0, 0); 
  }

  moveToFood(x, y){ //return a bool, whether the food is eaten

    this.desired.x = x;
    this.desired.y = y;
    let direction = p5.Vector.sub(this.desired, this.location); // gets vector between these two points

    // mag / magnitude is the length of the distance between the two points
    if (direction.mag() < this.br/2){
      return true; //stops moving as it returns before adding direction to velocity below
    } 

    //only move if they are close to the target x & y locations
    if(direction.mag() < 200){
      direction.normalize(); //normalize gives us the unit vector of length 1 (i.e. just the direction )
      this.velocity.add(direction);
    }
    return false;
  } 

  crawling() {
    // add friction to velocity
    this.friction.x = this.velocity.x * -1;
    this.friction.y = this.velocity.y * -1;
    this.friction.normalize();
    this.friction.mult(0.001);
    this.velocity.add(this.friction);

    // let angle=noise(this.location.x/500, this.location.y/500, frameCount/20)*TWO_PI*2; //0-2PI
    // this.location.x += this.velocity.x * cos(angle)*3;
    // this.location.y += this.velocity.y * sin(angle)*3;
    this.location.add(this.velocity);
    
    //bouncing
    if (this.location.x < 0 || this.location.x > width) this.velocity.x *= -1;
    if (this.location.y < 0 || this.location.y > height) this.velocity.y *= -1;
  }

  communication(other) {
    let d = dist(this.location.x, this.location.y, other.location.x, other.location.y);
    return d < this.br * 50 + other.br * 50;
  }

  contains(px, py) {
    let d = dist(px, py, this.location.x, this.location.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  changeColor(c) {
    this.color = c;
  }

  changeCoreColor(c0){
    this.coreColor = c0;
  }

  Draw(r) {
    push();
    translate(this.location.x, this.location.y);
    stroke(255, 255, 200);
    strokeWeight(1);
    
    let alpha1 = map(sin(zoff), -1,1,0,255);
    
    fill(this.color,alpha1);
    beginShape();

    //this.noiseMax = map(r, 0, 0.5, 1, 5);
    for (let a = 0; a < TWO_PI; a += radians(5)) {
      let xoff = map(cos(a + phase), -1, 1, 0, this.noiseMax + r);
      let yoff = map(sin(a + phase), -1, 1, 0, this.noiseMax + r);
      let rad = r + map(noise(xoff, yoff, zoff), 0, 1, r, this.br * 100);
      let x = rad * cos(a);
      let y = rad * sin(a);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    phase += 0.001;
    zoff += this.zoffUpdate;
    
    //draw core

    let alpha2 = map(r, 0, 0.5, 20, 255);

    fill(255, 255, 200, alpha1);
    ellipse(0, 0, r + this.br * 30);
    
    fill(this.coreColor, alpha2);
    ellipse(0, 0, r + this.br * 20);
    
    pop();
  }
}
