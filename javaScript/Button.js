class Button{
    constructor(x, y, w, h, text, onClick) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.onClick = onClick;
    }

    display() {
        rect(this.x, this.y, this.w, this.h);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.text, this.x + this.w / 2, this.y + this.h / 2);
      }

}