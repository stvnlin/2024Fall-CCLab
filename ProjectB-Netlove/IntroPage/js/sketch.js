let hearts = []; 
let heartSymbols = ["❤️", "🩷", "🩵", "🧡"]; 
let heartSize = 40; 
let gridCols = 30; 
let gridRows = 15; 
let clickCount = 0;
let defaultIMG;
let happyIMG;
let isHappy = false;
let switchFrame = 0;
let happyDuration = 60;
let failSound;
let clickSound;

function preload(){
  defaultIMG = loadImage("../assets/default.png");  // load image
  happyIMG = loadImage("../assets/happy.png");
  failSound = loadSound("../sound/introbackground.wav");
  clickSound = loadSound("../sound/introclicking.wav");
}

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


  if(isHappy == true){
    scale(0.8);
    image(happyIMG, width/2 - 50, height/2 - 50);

    if(frameCount - switchFrame > happyDuration){
      isHappy = false;
    }
  } else if(clickCount >= 7){
    isHappy = true;
    scale(0.8);
    image(happyIMG, width/2 - 50, height/2 - 50);
    //console.log("okk");

  } else{
    scale(0.8);
    image(defaultIMG, width/2 - 50, height/2 - 50);
  }
}

function mousePressed() {
  if (mouseX >= width / 2 - 50 && mouseX <= width / 2 + 50 &&
    mouseY >= height / 2 - 50 && mouseY <= height / 2 + 50) {
    clickSound.play();
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

  if(clickCount >= 8){

    window.location.href="../GamePage";

    // isHappy = true;
    // scale(0.8);
    // image(happyIMG, width/2 - 50, height/2 - 50);
  //   console.log("okk");
  }

  isHappy = true;
  switchFrame = frameCount;
  } else{
    failSound.play();
  }

  
}