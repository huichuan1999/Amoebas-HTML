// draw food
fill(255, 100, 100);
for (let i = 0; i < foodlocation.length; i++) {
    noiseCircles(foodlocation[i].x, foodlocation[i].y, 17);
}

// update and draw noise noiseCircless
for (let i = 0; i < noisenoiseCircless.length; i++) {
    let noiseCircles = NoiseCircles[i];
    noiseCircles.Draw(vol);
    noiseCircles.crawling();
    noiseCircles.bouncing();


    let isFoodEaten = false;
    for (let f = 0; f < foodlocation.length; f++) {
        if (!isFoodEaten && noiseCircles.findFood(foodlocation[f].x, foodlocation[f].y)) {
            isFoodEaten = true;
            noiseCircles.br += 1;
            if (noiseCircles.br > 20) {
                noiseCircles.br = 20;
                creatureState = 'full';
            }
        }
    }

    if (creatureState == 'full') {
        if (noiseCircles.br >= 7) {
            noiseCircles.br -= 5;
            noiseCircles.changeColor(color(255, 170));
        } else {
            creatureState = 'hungry';
        }
    }
}
//___________________________________________________________________________
for (let i = 0; i < noiseCircles.length; i++) {
    let isFull = (noiseCircles[i].br >= 10); // 设置一个变量来跟踪生物的状态

    for (let f = 0; f < newFoods.length; f++) {
        newFoods[f].display();

        if (noiseCircles[i].findFood(newFoods[f].location.x, newFoods[f].location.y)) {
            console.log("Arrived");
            noiseCircles[i].br += 0.1;

            if (isFull && noiseCircles[i].br < 10) { // 如果生物变小了，则不再是"full"状态
                isFull = false;
                noiseCircles[i].changeColor(color(255, 255, 255)); // 回到原始颜色
                console.log("i am hungry");
            } else if (noiseCircles[i].br >= 10) { // 如果生物达到尺寸限制，则变为"full"状态
                isFull = true;
                noiseCircles[i].br = 10;
                console.log("i am full");
            }
        }
    }

    if (isFull) {
        noiseCircles[i].crawling();
    } else {
        noiseCircles[i].changeColor(color(255, 170, 0));
        noiseCircles[i].br -= 0.1;
        console.log("i am being small");
    }
}

//___________________________________________________________________________
//原代码：
for (let i = 0; i < noiseCircles.length; i++) {
    noiseCircles[i].Draw(vol);
    noiseCircles[i].crawling();
    noiseCircles[i].bouncing();

    for (let f = 0; f < newFoods.length; f++) {
        newFoods[f].display();

        if (noiseCircles[i].findFood(newFoods[f].location.x, newFoods[f].location.y)) {
            //when it eat, it become bigger HUNGRY // 在这里执行生物处于饥饿状态时的操作

            console.log("Arrived");
            noiseCircles[i].br += 0.1; //吃东西 变大

            //the scale limit   EAT THE FOOD
            if (noiseCircles[i].br > 10) {
                noiseCircles[i].br = 10;
                creatureState = "full";
            }
        }
    }
    if (creatureState == "full") {
        //returning to hungry state 
        console.log("i am full");

        if (noiseCircles[i].br >= 1) {
            noiseCircles[i].br -= 0.1;
            noiseCircles[i].changeColor(color(255, 170));//change the core color
            noiseCircles[i].crawling();
            console.log("i am being small");

        } else {
            creatureState = "hungry";
            console.log("i am hungry");
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
//---------------------------------------------------------------------------
for (let f = 0; f < newFoods.length; f++) {
    newFoods[f].display();

    if (noiseCircles[i].findFood(newFoods[f].location.x, newFoods[f].location.y)) {
        //when it eats, it becomes bigger and enters the full state
        noiseCircles[i].br += 0.1; //吃东西 变大

        //the scale limit   EAT THE FOOD
        if (noiseCircles[i].br > 10) {
            noiseCircles[i].br = 10;
            console.log("i am full");
            noiseCircles[i].changeState("full");
        }
    }
}

if (noiseCircles[i].getState() == "full") {
    noiseCircles[i].br -= 0.1;
    noiseCircles[i].changeColor(color(255, 170));//change the core color
    noiseCircles[i].crawling();
    console.log("i am being small");

    if (noiseCircles[i].br <= 1) { //returning to hungry state 
        console.log("i am hungry");
        noiseCircles[i].changeState("hungry");
    }
} else {
    console.log("i am hungry");
    noiseCircles[i].changeState("hungry");
}

  //-------------------------------------------------------------------------------------
