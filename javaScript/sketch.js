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

let newFoods = [];

let feeding = false;
let clearing = false;

//let creatureState = "hungry";

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
      random(0.2, 1.2),// the original size
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

  if (frameCount % 4 == 0) randomPoints();
  //soundThreshod();

  for (let i = 0; i < noiseCircles.length; i++) {
    noiseCircles[i].Draw(vol);
    noiseCircles[i].crawling();
    noiseCircles[i].bouncing();
    
    //managing the state changing
    let currentSize = noiseCircles[i].br;
    let hungryThreshold = 2;
    let fullThreshold = 5;
    //let originalSize = noiseCircles[i].originalSize;
    
    if (currentSize < hungryThreshold) {
      noiseCircles[i].changeState("hungry");
    } else if (currentSize >= fullThreshold) {
      noiseCircles[i].changeState("full");
    }
  
    if (noiseCircles[i].creatureState == "full") {
      console.log("i am full");
      if (currentSize >= noiseCircles[i].originalSize) {
        noiseCircles[i].br -= 0.2;
        noiseCircles[i].changeColor(color(255,170,170,128));
        noiseCircles[i].crawling();
      }
    }

    for (let f = 0; f < newFoods.length; f++) {
      newFoods[f].display();

      if (noiseCircles[i].findFood(newFoods[f].location.x, newFoods[f].location.y)) {
        //when it eat, it become bigger HUNGRY // 在这里执行生物处于饥饿状态时的操作
        //console.log("Arrived");
        noiseCircles[i].br += 0.1; //吃东西 变大
      }
    }
    
    

    //communication
    let overlapping = false;
    for (let j = 0; j < noiseCircles.length; j++) {
      if (i != j) {
        if (noiseCircles[j] != noiseCircles[i] && noiseCircles[i].communication(noiseCircles[j])) {
          overlapping = true;
          //stroke(230, 238, 156, 100);
          stroke(255, 255, 200, 170);
          strokeWeight(4);
          line(noiseCircles[i].location.x, noiseCircles[i].location.y,
            noiseCircles[j].location.x, noiseCircles[j].location.y);
        }
      }
      //change color
      if (overlapping) {
        noiseCircles[i].changeColor(color(255, 152, 0, 20));
        noiseCircles[i].changeCoreColor(color(255, 200, 0));
      } else {
        noiseCircles[i].changeColor(color(230, 238, 156, 25));
        noiseCircles[i].changeCoreColor(color(255, 0, 0));
      }
    }
  }

}

function disableDrawingOnCanvas() {
  disableDrawing = true;
}
function enableDrawingOnCanvas() {
  disableDrawing = false;
}

function mousePressed() {
  if (!disableDrawing) {
    pressOnCanvas();
  }
}

function pressOnCanvas() {
  if (mouseX < width && mouseY < height) {
    newFood = new Food(mouseX, mouseY, random(10, 20));
    newFoods.push(newFood);
  }
  console.log(newFoods);
}

function handleButtonPress() {
  if (newFoods.length > 0) {
    newFoods.pop();
    clearing = true;
  }
  // for (let i = 0; i < noiseCircles.length; i++) {
  //   noiseCircles[i].br = noiseCircles[i].init_br;
  // }
}

function addGUI() {
  button = createButton("CLEAR");
  button.addClass("button");
  button.parent("gui-container");
  //Adding a mouse pressed event listener to the button
  button.mousePressed(handleButtonPress);
}

