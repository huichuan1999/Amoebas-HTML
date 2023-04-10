function randomPoints() {
    //stroke(255, 255, 180,30);
    //strokeWeight(1);
    noStroke();
    //fill(0, random(120, 255), random(120, 255), random(100));
    fill(0, random(0, 255), random(0, 255),10);
    ellipse(random(width), random(height), random(2, width));
}


function soundThreshod() {
  let vol = mic.getLevel();
  let threshold1 = 0.03;
  if (vol > threshold1) {
    fill(255, 255, 0);
    strokeWeight(1);
    stroke(255);
    ellipse(random(width), random(height), vol * 100);
  }

  let threshold2 = 0.4;
  if (vol > threshold2) {
    fill(0);
    ellipse(width / 2, height / 2, height, height);
  }
}  

function updateBG() {
    noStroke();
    //fill(210,210,255,20);
    fill(0, 100, 30, 5);
    rect(0, 0, width, height);
}

function addAmoebas(x,y){
    let r2 = random(0.2, 1.2);
    let zoffUpdate2 = random(0.05, 0.0001);
    let noiseMax2 = random(0, 1.5);
    let n = new NoiseCircle(x,y, r2, zoffUpdate2, noiseMax2);
    noiseCircles.push(n);
}
