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

function buttonKillACreaturePress(){
    removeAmoebas();

}

function buttonRestartPress(){
    location.reload();
}

function updateFoodColor(r, g, b) {
    for (let i = 0; i < newFoods.length; i++) {
        // Set the new color for the food
        newFoods[i].changeColor(color(r, g, b));
    }
}
