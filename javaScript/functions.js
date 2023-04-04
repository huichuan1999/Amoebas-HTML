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

function addAmoebas(){
    let r2 = random(0.2, 1.2);
    let zoffUpdate2 = random(0.05, 0.0001);
    let noiseMax2 = random(0, 1.5);
    let n = new NoiseCircle(mouseX, mouseY, r2, zoffUpdate2, noiseMax2);
    noiseCircles.push(n);
}
  
// function updateFood(){
//   for(let i = food.length-1; i >= 0 ; i--){
//     fill(100);
//     circle(food[i].x,food[i].y,food[i].d);
//     food[i].y += 1;
//     if(food[i].y > height){
//       food.splice(i,1);//remove one from array at index i
//     }
//   }
// }