//Egg Amoebas
//1-14-2023,Huichuan Wang
/*
It is a array of amoebas shapes like fried eggs, so I named it egg amoeba.
I want to show it like real amoebas crawling zigzaggy. It will react to your sound, like a biological stress response. They also would like to communicate to each other,when they get close they will change color and concat together, exchange pheromones.
When you make a sound, yellow dots are generated at random positions, and their radius is your volume.When your sound is higher than the threshold, the background change.
*/
//Acknowledgements (references, links, inspirations, etc:
//noise loop references:https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn
//mic threshold : https://editor.p5js.org/p5/sketches/Sound:_Mic_Threshold
//particle system: https://p5js.org/examples/simulate-particles.html

let mic;
let phase = 0;
let zoff = 0;

let noiseCircles = [];

let foodlocation = [];
let food = 0;
let feeding = false;
let clearing = false;

let hungry = 0;
let full = 1;
let creatureState = hungry;

let canvas;
let button;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");

  mic = new p5.AudioIn();
  mic.start();
  //addGuI();

  for (let i = 0; i < 25; i++) {

    let zoffUpdate1 = random(0.001, 0.0001);
    let noiseMax1 = random(0, 1.5);

    noiseCircles[i] = new NoiseCircle(random(width), random(height), 
    random(0.2, 1.2), 
    zoffUpdate1, noiseMax1);
  }
  addGUI();
}

function draw() {
  let vol = mic.getLevel() * 5;

  //updateBG();
  randomPoints();
  //soundThreshod();

  food = foodlocation.length;//the number of food

  for (let i = 0; i < noiseCircles.length; i++) {
    noiseCircles[i].Draw(vol);
    //noiseCircles[i].Draw(5);
    noiseCircles[i].crawling();
    
    // for(let f = 0; f < foodlocation.length; f++){
    //    if(creatureState = hungry && 
    //     noiseCircles[i].moveToFood(foodlocation[f].x,foodlocation[f].y)){
    //     //when it eat, it become bigger HUNGRY // 在这里执行生物处于饥饿状态时的操作
    //     //noiseCircles[i].firction();//减速
    //     noiseCircles[i].br += 1; //变大
        
    //     //the scale limit   EAT THE FOOD
    //     if(noiseCircles[i].br >= 100/* 这个生物进食了 */){ 
    //       noiseCircles[i].br = 100;
    //       creatureState = full;
    //     }
    //    }
    //    else if(creatureState == full){ 
    //     // 在这里执行生物处于饱食状态时的操作
    //     //returning to hungry state
    //       if(noiseCircles[i].br >= 1){
    //         noiseCircles[i].br -= 1;
    //         //noiseCircles[i].changeColor(color(255,170));//change the core color
    //         noiseCircles[i].crawling();
    //       }
          
    //    }else{
    //     creatureState = hungry;
    //     noiseCircles[i].crawling();
    //    }
    //    //draw food
    //     fill(255,100,100);
    //     circle(foodlocation[f].x, foodlocation[f].y, 17);
    // }

    //communication
    let overlapping = false;
    for (let j = 0; j < noiseCircles.length; j++) {
      if (i != j) {
        if (noiseCircles[j] != noiseCircles[i] && noiseCircles[i].communication(noiseCircles[j])) {
          overlapping = true;
          stroke(230, 238, 156, 100);
          strokeWeight(4);
          line(noiseCircles[i].location.x,noiseCircles[i].location.y,
            noiseCircles[j].location.x,noiseCircles[j].location.y);
        }
      }
      //change color
      if (overlapping) {
        noiseCircles[i].changeColor(color(255, 152, 0, 50));
        noiseCircles[i].changeCoreColor(color(255, 152, 0, 50));
      } else {
        noiseCircles[i].changeColor(color(230, 238, 156, 25));
        noiseCircles[i].changeCoreColor(color(255,0,0));
      }
    }
    //noStroke();
  }
    
}

function mousePressed() {
  // let r2 = random(0.2, 1.2);
  // let zoffUpdate2 = random(0.05, 0.0001);
  // let noiseMax2 = random(0, 1.5);
  // let n = new NoiseCircle(mouseX, mouseY, r2, zoffUpdate2, noiseMax2);
  // noiseCircles.push(n);
   
  if (mouseX < width && mouseY < height) {
    let foodLoc = createVector(mouseX, mouseY);
    foodlocation.push(foodLoc);

    //console.log(foodlocation);
  }

}

function updateBG() {
  noStroke();
  //fill(210,210,255,20);
  fill(0, 100, 30, 5);
  rect(0, 0, width, height);
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

function randomPoints() {
  //stroke(255, 255, 180,30);
  //strokeWeight(1);
  noStroke();
  //fill(0, random(120, 255), random(120, 255), random(100));
  fill(0, random(120, 255), random(120, 255),5);
  ellipse(random(width), random(height), random(2, width));
}

function addGUI(){
  button = createButton("CLEAR");

  button.addClass("button");

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