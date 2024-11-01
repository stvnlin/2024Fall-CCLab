/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new LindseyDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class LindseyDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dancerX = startX;
    this.dancerY = startY;
    this.angle = 0;
    // add properties for your dancer here:
    
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour

    this.dancerY = cos(this.angle) * 10 + 30;
    this.angle += PI/30;

  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    push();
    translate(this.x, this.y);

    let layers = this.dancerY * 1.3;

    noStroke();
    fill(240, 180, 80);
    ellipse(0, -30 + layers, 80, 35);
    
    fill(240, 180, 80);
    ellipse(0, 15 + this.dancerY, 70, 20);
    
    //eyes
    fill(255);
    circle(10, -30 + layers, 18);

    fill('brown');
    circle(8, -30 + layers, 15);

    fill(255);
    circle(-8, -30 + layers, 18);

    fill('brown');
    circle(-10, -30 + layers, 15);
    //eyes end

    //body
    fill(144, 238, 144);
    rect(-35, -15 + layers*0.95, 70, 8, 5);

    fill(255, 99, 71);
    rect(-30, -5 + layers*0.9, 60, 8, 5);

    fill(139, 69, 19);
    rect(-40, 5 + layers*0.85, 80, 10, 5);

    fill(255, 223, 0);
    rect(-40, 2 + layers*0.85, 80, 6, 3);
    //body end

    //legs
    stroke(240, 180, 80);
    strokeWeight(5);
    line(-15, 28 + this.dancerY, -15 + sin(this.angle) * 5, 40 + this.dancerY);
    line(15, 28 + this.dancerY, 15 - sin(this.angle) * 5, 40 + this.dancerY);
    //legs end

    //arms
    stroke(240, 180, 80);
    strokeWeight(3);
    line(-60, -25 + layers, -40, -5 + layers);
    line(-60, -30 + layers, -50, -20 + layers);
    line(-60, -20 + layers, -50, -10 + layers);
    line(-50, -20 + layers, -50, -10 + layers);

    line(60, -25 + layers, 40, -5 + layers);
    beginShape();
    vertex(60, -25 + layers);
    vertex(55, -15 + layers);
    vertex(50, -15 + layers);
    vertex(60, -25 + layers);
    endShape(CLOSE);
    //arms end


    this.drawReferenceShapes()

    pop();
    

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

  }
  
  drawReferenceShapes() {
    noFill();
    strokeWeight(1);
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }


}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/