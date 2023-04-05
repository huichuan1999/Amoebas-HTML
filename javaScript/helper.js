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
