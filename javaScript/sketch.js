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

let disableDrawing = false;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");

  mic = new p5.AudioIn();
  mic.start();

  for (let i = 0; i < 12; i++) {
    let zoffUpdate1 = random(0.001, 0.0001);
    let noiseMax1 = random(0, 1.5);

    noiseCircles[i] = new NoiseCircle(random(width), random(height), 
    random(0.2, 1.2), 
    zoffUpdate1, noiseMax1);
  }
  addGUI();

  button.mouseOut(() => {
    console.log('Mouse left button');
  });

  button.mouseOver(disableDrawingOnCanvas);
  button.mouseOut(enableDrawingOnCanvas);
}

function draw() {

  let vol = mic.getLevel() * 5;

  //background(0);
  //updateBG();

  if(frameCount % 4 == 0) randomPoints();
  //soundThreshod();

  food = foodlocation.length;//the number of food

  for (let i = 0; i < noiseCircles.length; i++) {
    noiseCircles[i].Draw(vol);
    //noiseCircles[i].Draw(5);
    noiseCircles[i].crawling();
    
     for(let f = 0; f < foodlocation.length; f++){
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
        fill(255,100,100);
        circle(foodlocation[f].x, foodlocation[f].y, 17);
    }

    //communication
    let overlapping = false;
    for (let j = 0; j < noiseCircles.length; j++) {
      if (i != j) {
        if (noiseCircles[j] != noiseCircles[i] && noiseCircles[i].communication(noiseCircles[j])) {
          overlapping = true;
          //stroke(230, 238, 156, 100);
          stroke(255,255,200,170);
          strokeWeight(4);
          line(noiseCircles[i].location.x,noiseCircles[i].location.y,
            noiseCircles[j].location.x,noiseCircles[j].location.y);
        }
      }
      //change color
      if (overlapping) {
        noiseCircles[i].changeColor(color(255, 152, 0, 20));
        noiseCircles[i].changeCoreColor(color(255, 200, 0));
      } else {
        noiseCircles[i].changeColor(color(230, 238, 156, 25));
        noiseCircles[i].changeCoreColor(color(255,0,0));
      }
    }
    //noStroke();
  }
    
}

function disableDrawingOnCanvas(){
   disableDrawing = true;
}
function enableDrawingOnCanvas(){
  disableDrawing = false;
}

function mousePressed() {
  if(!disableDrawing){
    pressOnCanvas();
  }
}

function pressOnCanvas(){
  if (mouseX < width && mouseY < height) {
    let foodLoc = createVector(mouseX, mouseY);
    foodlocation.push(foodLoc);
  }
  console.log(foodlocation);
}

function handleButtonPress() {
  if (foodlocation.length > 0) {
    foodlocation.pop();
    clearing = true;
  }
}

function addGUI(){
  button = createButton("CLEAR");
  button.addClass("button");
  button.parent("gui-container");
  //Adding a mouse pressed event listener to the button
  button.mousePressed(handleButtonPress);
}



