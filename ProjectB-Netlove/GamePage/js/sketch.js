let heartSize = 40; 
let gridCols = 30; 
let gridRows = 15; 
let hearts = []; 
let clickCount = 0; //arrow
let choiceCount = 0; // tick
let musicCount = 0;
let timeOfLastClick = -100;
let isClickable = true;
let cookieChoose = false;
let symbols = ["😴", "👋", "🍪", "🐛"];
let mood = 3;
let moodIcon = "😑"
let heart = 0;
let heartIcon = "♡♡♡♡♡";
let girl;
let music;
let buttonSound;
let choiceSound;
let errorSound;
let finalSound;
let finalgiftIMG;
let musicIMG;
let defaultIMG;
let afraidIMG;
let doesntcareIMG;
let foodIMG;
let happyIMG;
let sleepIMG;

function preload() {
  music = loadSound("../sound/BGM.wav");
  buttonSound = loadSound("../sound/buttonPress.wav");
  choiceSound = loadSound("../sound/gameChoice.wav");
  errorSound = loadSound("../sound/noclick.wav");
  finalSound = loadSound("../sound/finalAward.wav");

  defaultIMG = loadImage("../assets/default.png");
  musicIMG = loadImage("../assets/music.png");
  finalgiftIMG = loadImage("../assets/finalgift.png");
  afraidIMG = loadImage("../assets/afraid.png");
  doesntcareIMG = loadImage("../assets/doesntcare.png");
  foodIMG = loadImage("../assets/food.png");
  happyIMG = loadImage("../assets/happy.png");
  sleepIMG = loadImage("../assets/sleep.png");
}

function setup() {
  let canvas = createCanvas(1200, 600);
  canvas.parent("p5-canvas-container");
  for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 30; col++) {
      hearts.push({x: col * heartSize, y: row * heartSize, symbol: "♡"});
    }
  }

  girl = new UpdatedStatus(1150, 300);
}

function draw() {
  background(139, 134, 200);
  fill(100);
  // for (let i = 0; i < hearts.length; i++) {
    textSize(heartSize);
    textAlign(CENTER, CENTER);
  //   text(hearts[i].symbol, hearts[i].x + heartSize / 2, hearts[i].y + heartSize / 2);
  // }

  
  fill(255);
  ellipse(width/2, height/2, 1000, 600);
  fill(0, 0, 0, 200);
  rect(250, 100, 700, 320, 20);
  
  //shadow
  fill(103, 103, 255, 150)
  ellipse(393, 473, 75);
  ellipse(390+200+3, 470+3 ,75);
  ellipse(390+400+3, 470+3, 75);


  //buttons
  fill(103, 103, 255);
  noStroke();
  ellipse(390, 470, 70);
  text("➡️", 390, 470);
  ellipse(390+200, 470 ,70);
  text("✔️", 390+200, 470);
  ellipse(390+400, 470, 70);
  text("🎶", 390+400, 470);

  //options on screen
  let optionChoice = int (clickCount % 4);
  if(optionChoice == 1){
    text("👋", width/2 - 180, 350);
  }

  if(optionChoice == 2){
    text("🍪", width/2 - 60, 350);
  }

  if(optionChoice == 3){
    text("🐛", width/2 + 60, 350);
  }

  if(optionChoice == 0){
    text("😴", width/2 + 180, 350);
  }

  //girl image
  fill(255);
  rect(460, 130, 400, 160)

  //moodIcon
  text(moodIcon, 310, 200);

  //heartIcon
  textSize(30);
  text(heartIcon, 360, 150);

  //heart default draw
  // for (let i = 0; i < 5; i++) {
  //   textSize(30);
  //   text("♡", width / 2 + i * 30 - 300, 150); 
  // }

  if (mood == 5 && heart == 5) {
    console.log("Final gift unlocked!");
    noLoop();
    finalSound.play();  
    girl.finalWin();
  }

  girl.update();
  girl.display();

}

function mousePressed() {
  //5seconds no twice click mechanic
  let currentTime = millis();
  let timeSinceLastClick = currentTime - timeOfLastClick;
  if(timeSinceLastClick > 1500){
    timeOfLastClick = millis();
    isClickable = true;
  } else{
    isClickable = false;
    errorSound.play();
  }

  //arrow button
  if (dist(mouseX, mouseY, 390, 470) < 35) {
    buttonSound.play();
    console.log(clickCount);
    clickCount ++;
    girl.returnDefault();
  }

  //select button
  if (dist(mouseX, mouseY, 390 + 200, 470) < 35 && isClickable == true) {

    choiceSound.play();
    choiceCount ++;
    console.log("choice count =", choiceCount);

    let optionChoice = int (clickCount % 4);
    console.log("THE CHOSEN ONE IS" + symbols[optionChoice]);

    //greeting
    if(optionChoice == 1 && heart < 5){
      heart ++;
      console.log(heart);
      updateHeartIcon();
      girl.happy();
    }

    //cookie
    if(optionChoice == 2){
      cookieChoose = true;
      girl.eatFood();
      let increase = random(["mood","heart"]);
      if (increase == "mood" && mood < 5){
        mood ++;
        updateMoodIcon();
      }
      if(increase == "heart" && heart < 5){
        heart ++;
        console.log("heart =", heart);
        updateHeartIcon();
      }
    }

    //insect
    if(optionChoice == 3 && mood > 0){
      girl.afraid();
      mood --;
      updateMoodIcon();
    }

    //sleep
    if(optionChoice == 0 && mood < 5){
      girl.sleep();
      mood ++;
      console.log(mood);
      updateMoodIcon();
    }
  }

  //music button
  // if (dist(mouseX, mouseY, 390 + 400, 470) < 35 && heart < 5) {
  //   heart ++;
  //   //console.log(heart);
  //   updateHeartIcon();
  // }

  //music button for BGM
  if (dist(mouseX, mouseY, 390 + 400, 470) < 35 && isClickable == true){
    if (heart < 5) {
      heart ++;
      //console.log(heart);
      updateHeartIcon();
    }

    musicCount ++;
    music.play();
    girl.musicButton();

    if(musicCount % 2 == 0){
      music.stop();
      girl.returnDefault();
      heart--;
      updateHeartIcon();
    }

  }
  if (choiceCount >= 3) {
    if (!cookieChoose) {
      heart --; 
      updateHeartIcon();
      console.log("need cookie!");
    }

    choiceCount = 0;
    cookieChoose = false;
  }

}

function updateMoodIcon() {
  if (mood == 5) {
    moodIcon = "😊";
  } else if (mood == 4) {
    moodIcon = "🙂";
  } else if (mood == 3) {
    moodIcon = "😑";
  } else if (mood == 2) {
    moodIcon = "🙁";
  } else if (mood == 1){
    moodIcon = "😡";
  }
}

function updateHeartIcon(){
  
  if (heart == 5) {
    heartIcon = "🩷🩷🩷🩷🩷";
  } else if (heart == 4) {
    heartIcon = "🩷🩷🩷🩷♡";
  } else if (heart == 3) {
    heartIcon = "🩷🩷🩷♡♡";
  } else if (heart == 2) {
    heartIcon = "🩷🩷♡♡♡";
  } else if (heart == 1){
    heartIcon = "🩷♡♡♡♡";
  } else {
    heartIcon = "♡♡♡♡♡";
  }
}

class UpdatedStatus{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.speed = 2;
    this.direction = 1;
    this.displayImg = defaultIMG;
  }
  update(){
    this.x += this.speed * this.direction
    if(this.x >= 1450 || this.x <= 850){
      this.direction *= -1;
    }
   
  }
  
  happy(){
    this.displayImg = happyIMG;
  }

  eatFood(){
    this.displayImg = foodIMG;
  }

  afraid(){
    this.displayImg = afraidIMG;
  }

  sleep(){
    this.displayImg = sleepIMG;
  }

  musicButton() {
    this.displayImg = musicIMG;
  }

  returnDefault(){
    this.displayImg = defaultIMG;
  }

  finalWin(){
    this.displayImg = finalgiftIMG;
  }

  display(){
    scale(0.5);
    image(this.displayImg, this.x, this.y);    
  }
}