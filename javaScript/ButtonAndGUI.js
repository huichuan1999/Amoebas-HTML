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

function RGBSlider() {

    // Create sliders for each RGB component
    redSlider = createSlider(0, 255, 128);
    greenSlider = createSlider(0, 255, 128);
    blueSlider = createSlider(0, 255, 128);

    redSlider.position(10, 10);
    greenSlider.position(10, 40);
    blueSlider.position(10, 70);

    redSlider.parent("slider-container");
    greenSlider.parent("slider-container");
    blueSlider.parent("slider-container");

    redSlider.input(() => updateFoodColor(redSlider.value(), greenSlider.value(), blueSlider.value()));
    greenSlider.input(() => updateFoodColor(redSlider.value(), greenSlider.value(), blueSlider.value()));
    blueSlider.input(() => updateFoodColor(redSlider.value(), greenSlider.value(), blueSlider.value()));
}

function updateFoodColor(r, g, b) {
    for (let i = 0; i < newFoods.length; i++) {
        // Set the new color for the food
        newFoods[i].changeColor(color(r, g, b));
    }
    //document.body.style.backgroundColor = 'rgb(r,g,b)';
}

// // 初始化Pickr
// const pickr = Pickr.create({
//     el: '#color-picker', // 指定取色器的容器元素
//     theme: 'classic', // 指定取色器的主题
//     useAsButton: true, // 设置取色器为按钮形式
//     swatches: [ // 设置默认的颜色
//         'rgba(244, 67, 54, 1)',
//         'rgba(233, 30, 99, 1)',
//         'rgba(156, 39, 176, 1)',
//         'rgba(103, 58, 183, 1)',
//         'rgba(63, 81, 181, 1)',
//         'rgba(33, 150, 243, 1)',
//         'rgba(3, 169, 244, 1)',
//         'rgba(0, 188, 212, 1)',
//         'rgba(0, 150, 136, 1)',
//         'rgba(76, 175, 80, 1)',
//         'rgba(139, 195, 74, 1)',
//         'rgba(205, 220, 57, 1)',
//         'rgba(255, 235, 59, 1)',
//         'rgba(255, 193, 7, 1)'
//     ],

//     components: { // 显示的颜色组成部分
//         preview: true,
//         opacity: true,
//         hue: true,
//         interaction: {
//             hex: true,
//             rgba: true,
//             hsla: false,
//             hsva: false,
//             cmyk: false,
//             input: true,
//             clear: true,
//             save: true
//         }
//     }
// });

// // 为Pickr添加事件监听器
// pickr.on('change', (color) => {
//     let r = color.toRGBA()[0];
//     let g = color.toRGBA()[1];
//     let b = color.toRGBA()[2];

//     // 将颜色值传递给你的更新颜色的函数
//     updateFoodColor(r, g, b);
// });