let hearts = []; 
let heartSymbols = ["❤️", "🩷", "🩵", "🧡"]; 
let heartSize = 40; 
let gridCols = 30; 
let gridRows = 15; 
let clickCount = 0;

function setup() {
  let canvas = createCanvas(1200, 600);
  canvas.parent("p5-canvas-container");
  for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 30; col++) {
      hearts.push({x: col * heartSize, y: row * heartSize, symbol: "♡"});
    }
  }
  
}


function draw() {
  background(139, 134, 200);
  
  for (let i = 0; i < hearts.length; i++) {
    textSize(heartSize);
    textAlign(CENTER, CENTER);
    text(hearts[i].symbol, hearts[i].x + heartSize / 2, hearts[i].y + heartSize / 2);
  }

  rect(width/2 - 80, height/2 - 80, 160);
}

function mousePressed() {
  if (mouseX >= width / 2 - 80 && mouseX <= width / 2 + 80 && mouseY >= height / 2 - 80 && mouseY <= height / 2 + 80){
    let changedCount = 0;
    let randomHearts = []; 
  
  for (let i = 0; i < hearts.length; i++) {
    if (hearts[i].symbol === "♡") {
      randomHearts.push(hearts[i]);
    }
  }
  
  while (changedCount < 100 && randomHearts.length > 0) {
    let randHeart = randomHearts[int(random(randomHearts.length))]; 
    randHeart.symbol = heartSymbols[int(random(heartSymbols.length))];  
    changedCount++;
  }
  clickCount++;

  if(clickCount >= 7){
    console.log("okk");
  }
  }

  
}