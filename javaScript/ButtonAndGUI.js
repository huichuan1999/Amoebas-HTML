class Button {
    constructor(label, onClick) {
        this.label = label;
        this.onClick = onClick;

        this.button = createButton(this.label);
        this.button.addClass("button");
        this.button.parent("gui-container");

        this.button.mousePressed(this.onClick);

        this.button.mouseOver(this.disableDrawingOnCanvas.bind(this));
        this.button.mouseOut(this.enableDrawingOnCanvas.bind(this));

    }

    disableDrawingOnCanvas() {
        disableDrawing = true;
    }

    enableDrawingOnCanvas() {
        disableDrawing = false;
    }
}

function buttonClearPress() {
    if (newFoods.length > 0) {
        // Remove the last added food from 'foods' array
        let foodIdToRemove = newFoods[newFoods.length - 1].id;

        newFoods.pop();
        clearing = true;
        //foodPG.clear();
        foodPG.background(0, 0, 0, 0);

        newFoods = newFoods.filter(newFood => newFood.id !== foodIdToRemove);
    }
}

function buttonAddACreaturePress() {
    addAmoebas(random(width), random(height));
}

function RGBSlider() {

    // Create sliders for each RGB component
    redSlider = createSlider(0, 255, 128);
    greenSlider = createSlider(0, 255, 128);
    blueSlider = createSlider(0, 255, 128);
    redSlider.position(10, 10);
    greenSlider.position(10, 40);
    blueSlider.position(10, 70);

    // // Add event listeners to update food color when slider values change
    // redSlider.input(updateFoodColor);
    // greenSlider.input(updateFoodColor);
    // blueSlider.input(updateFoodColor);
    // Add event listeners to update food color when slider values change
    redSlider.input(() => updateFoodColor(redSlider.value(), greenSlider.value(), blueSlider.value()));
    greenSlider.input(() => updateFoodColor(redSlider.value(), greenSlider.value(), blueSlider.value()));
    blueSlider.input(() => updateFoodColor(redSlider.value(), greenSlider.value(), blueSlider.value()));
}

function updateFoodColor(r, g, b) {
    for (let i = 0; i < newFoods.length; i++) {
        // Set the new color for the food
        newFoods[i].changeColor(color(r, g, b));
    }
}