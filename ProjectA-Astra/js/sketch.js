let width=800; //width of Canvas
let height=500; //geight of Canvas

// let fishStatus = 1; //fish status: 


let fishStatus = 1;  //fish Status

let grassLevel=100; //Y value of the area of grass
let coralLevel=450; // Y value of the area contains coral

let grass=[]; //Y value of each heap of grasses

let waterLevel = 300;  //current water level
let waterUpLevel = 250; //the up limit of water surface
let waterDownLevel = 380; // the down limit of water surface
let fishReturnLevel = 300; // the level fish go into/out of water

let fishX=400; //X value of fish center
let fishY=waterLevel + 30; //Y value of fish center
let dire = 1; // the direction of fish swim

let waterMove = 1; // the direction (up/down) of water surface

let tikCatShow = 0; //the time to show cat
let catShowX = 0; // the X of cat

let showBait = false;  // if the bait is showed
let showEnemy = false; // if the jellyfish is showed

let otherX = 0;  // the X of bait or jellyfish
let otherY = 0;  // the Y of bait or jellyfish

let otherMoveY = -1

// the setup of canvas, and setup grass[] value, draw coral area
function setup() {
  let cnv= createCanvas(width, height);
  cnv.parent("p5-canvas-container")
 
  for (let i = 0; i<10; i++){
    grass[i] = int(random(20, grassLevel));
  }

  background(220);
  drawCoral();
}

// draw the canvas
function draw() {
  
  // clear the part need to be repaint
  fill(220);
  rect(0, 0, width, coralLevel);  
  
  textSize(30)
  text("🎣",100,430)

  //draw the grass
  drawGrass();


  // if Cat is to be showed, cat should be showed at right side of heap, until tikCatShow is out
  if(tikCatShow > 0){
    let catX = int(catShowX / 80) * 80 + 60;
    let catY = grass[int(catShowX/80)] + 50;
    textSize(48);
    text("🐈", catX, catY);    
    tikCatShow--;
  }

  //check mouse statu to move water surface
  if(mouseIsPressed)
  {
    if(mouseY > waterLevel){ //mouse click underwater area to move the water 
      showBait = false;
      showEnemy = false;

      waterLevel += waterMove; //if waterMove >0 move down else move up

      if(waterLevel>=waterDownLevel){ //if water reachs low limit
        waterMove=-1;
      }
      if(waterLevel<=waterUpLevel){ //if water reachs high limit
        waterMove=1;
      }
    }  
  }

  
  //let baseline = map(sin(frameCount * 0.001), -1, 1,  grassLevel, coralLevel);  //the water line should move up/down 
  
  drawLake(waterLevel); //draw the water

  if(showBait||showEnemy){ //if bait or jellyfish is on, show it
    drawOther();
  }

  if(fishStatus==1){ //swim mode
    let fishSpeed = dire;  //normal speed
    if(showBait){  //if bait is on
      if((fishX - otherX) * dire < 0) //if fish swim towards bait
      {
        fishSpeed = 3 * dire; // speed up
        if(fishY > otherY) fishY--; //move fish to bait level
        if(fishY < otherY) fishY++; 
      }      
    }

    if(showEnemy) //if jellyfish is on
    {
      if((fishX - otherX) * dire > 0) //if fish swim awy from jellyfish, speed up
        fishSpeed = 3 * dire; 
    }

    fishX += fishSpeed; //move fish X-axis
    
    if(showBait) // if reach bait, remove bait
      if((fishX > otherX - 30) && (fishX < otherX + 30)) showBait = false;

    if(showEnemy){ // if reach jellyfish, change direction
      if(fishX > otherX - 30 && fishX < otherX + 30){
          dire = - dire;
        }          
    }

    // if(fishX>750 || fishX<50){ // if reach border change direct
    //     dire=-dire; 
    //     fishX -= fishSpeed; // in case over border more than 1
    // } //if fish swim to the border, turn around

    if(fishX > 750){
      dire = -1;
      fishX = 750;
    }
    if(fishX < 50){
      dire = 1;
      fishX = 50;
    }
    
    swim(fishX, fishY, -dire); // draw swim fish

    if(waterLevel > fishReturnLevel)  // if water is low, change fish mode
      fishStatus = 2;
  }
  if(fishStatus==2) //fish go to shore
  {
    fishY -= 5;
    if(fishY <= grass[int(fishX/80)]+80){ //if fish meet grass, change fish mode
      fishY -= 60; 
      fishStatus=4;
    }
    walk(fishX, fishY, 1);
  }
  if(fishStatus==4)  //fish hiding 
  {
    if(waterLevel < fishReturnLevel){ // if water is high, change fish mode
      fishStatus=3;
    }
    drawTail(fishX, fishY, 2, true);
  }
  if(fishStatus==3){ // fish go back to water
    fishY += 5;
    if(fishY>=waterLevel+30) // if fish in swimming position, change fish mode
      fishStatus=1;
    walk(fishX, fishY, -1);
  }
}

// draw bait or jellyfish
function drawOther() {
  otherY += otherMoveY ;

  if(otherX>750) otherX = 750;
  if(otherX<50) otherX = 50;
  if(otherY<waterLevel) {
    otherY = waterLevel ;
    otherMoveY = 1;
  }
  if(otherY>coralLevel-60) {
    otherY= coralLevel-60;
    otherMoveY = -1;
  }

  fill(0);
  textSize(36);
  if(showBait){
    text("🐟", otherX, otherY);
  }
  if(showEnemy) {
    text("🪼", otherX, otherY);
  }
  
}

// draw coral
function drawCoral() {
  noStroke();
  fill(102, 178, 255,20);

  for (let i = 0; i < 25; i++){  
    rect(0, coralLevel, width, height);  
  }
  for (let n = 0; n < 300; n++) {
    let coralAngle = random(0, 90);
    let coralX = random(0, width);
    let coralY = random(coralLevel+25, height);    
    if(random(0,1)>0.5){
      fill(255, random(150, 205), random(150, 205));
      push();
      translate(coralX, coralY);
      rotate(radians(coralAngle));
      rect(0, 0, random(5,25));
      pop();
    }else {
      fill(255, random(150, 205), random(150, 205));
      push();
      translate(coralX, coralY);
      ellipse(0, 0, random(5,25), random(5,25));
      pop();
    }        
  }
//   for (let coralX = 0; coralX < width; coralX+=20) {
//     // let coralX = random(50, width-60);
//     let coralY = height;
//     push();
//     textSize(int(random(1,10)) * 8);
//     text("🪸", coralX, coralY)
//     pop();
//     // }
        
//   }  
}

//draw the lake with surface of base line
function drawLake(baseline) {
  noStroke();
  fill(102, 178, 255,20);

  for (let i = 0; i < 25; i++){ //draw 25 surface of lake to show the wave part
    beginShape();
      
    vertex(0, coralLevel); //start point
    for (let x = 0; x < width; x++) { //calculate the position of each point of wave
      
      let y = sin((x) / 20) * 10;
      let noiseValue = noise(x, y);
      vertex(x, y + int(baseline) - i * 2 + noiseValue * 5); // draw wave
    }
    vertex(width, coralLevel) //end point to close the lake
    endShape();
  }


  fill(0);

  if(overBait()){
    textSize(48);
  } else {
    textSize(36);
  }
  textAlign(LEFT);
  text("☺️", 0, 40);  
  
  if(overEnemy()){
    textSize(48);
  } else {
    textSize(36);
  }
  textAlign(RIGHT);
  text("😨", width, 40);
}

//draw grass heaps from left to right, every 80 pixwl there's one grass[i] to decide Y of heap
// extend left 80 pixel and right 80 pixel to make heap longer for visual effect
function drawGrass(){ 
  for (let x = 0; x < width; x += 10) 
  {
    fill(50,255,50);
    let noiseValue = noise(x * 0.01, frameCount * 0.01);
    let grassHeight = map(noiseValue, 0, 1, 5, 55);
    let grassAngle = map(noiseValue, 0, 1, -PI / 12, PI / 12);

    push();
    translate(x, grass[int(x/80)]);    
    rotate(grassAngle);
    triangle(0, 60, 10, int(grassHeight), 30, 60);
    pop();

    push();
    translate(x-80, grass[int(x/80)]);    
    rotate(grassAngle);
    triangle(0, 60, 10, int(grassHeight), 30, 60);
    pop();
    
    push();
    translate(x+80, grass[int(x/80)]);    
    rotate(grassAngle);
    triangle(0, 60, 10, int(grassHeight), 30, 60);
    pop();
  }
}

// draw fish horinzatal 
function swim(x, y, dire) { //draw swim fish
  noStroke()
  fill(100, 150, 255); 
  
  push()
  translate(x,y)
  rotate(radians(160*dire))
  ellipse(0, 10, 30, 10); //left
  pop()
   
  push()
  translate(x,y)
  rotate(radians(20*dire))
  ellipse(0, 10, 30, 10); //right
  pop()
  
  fill(150, 200, 255);
  ellipse(x, y, 60, 20); //body

  //tail move
  drawTail(x, y, dire + 2);
}

//draw the tail, rotate for different status, shrink if hiding
function drawTail(x, y, dire, isHiding=false){
 //calculate the tail status
  let step = int (frameCount / 20) % 4;
  tail_up = 1;
  tail_down = 1;
  if(step==1){
    tail_up = 2;
  }
  if(step==3){
    tail_down=2;
  }

  let tail_width = 100;
  let tail_height = 100;

  if(isHiding)
  {
    tail_width = 60;
    tail_height = 60;   
  }
  
  push();

  translate(x, y)

  if(dire==0){
    rotate(radians(270));
  }
  if(dire==1){
    rotate(radians(180));
  }
  if(dire==2){
    rotate(radians(90));
  }
  if(dire==3){
    rotate(radians(0));
  }
  
  fill(150, 200, 255); 
  beginShape();
  vertex(30, 0);

  bezierVertex(tail_width, -tail_height/tail_up, tail_width, tail_height/tail_down, 30, 0); //tail
  
  endShape(CLOSE);
  pop();
}

// draw walking fish
function walk(x, y, dire, step) {
  noStroke()
  fill(100, 150, 255); 
  
  push();
  translate(x,y);
  rotate(radians(70 + (dire+1)/2*180));
  ellipse(0, 10, 30, 10); //left
  pop();
   
  push();
  translate(x,y);
  rotate(radians(-70 + (dire+1)/2*180));
  ellipse(0, 10, 30, 10); //right
  pop();

  fill(150, 200, 255);
  ellipse(x, y, 20, 60); //body
  
  drawTail(x, y, dire+1);
}

//whenn mouse press, check if fish status, if hiding, use cat to catch, if swim use bait/jellyfish
function mousePressed() {
  if(fishStatus == 4){
    if(tikCatShow == 0){
      if(mouseX < fishX + 80 && mouseX > fishX - 80){
        if(mouseY < grass[int(fishX / 80)] + 60 && mouseY > grass[int (fishX / 80)]){
          tikCatShow = 60;          
          catShowX = fishX;

          do {
            newFishX = random(0, width); 
          }while (int(newFishX / 80) == int(fishX / 80));

          fishX = newFishX;
          fishY = grass[int(fishX/80)];
        }
      }      
    }
  }
  
  if(fishStatus==1){
    if(showEnemy)
    {
      if(overEnemy())
        showEnemy=false;
    } else {
      if(!showBait){      
        if(overBait()){
          showBait = true;        
        }
        if(overEnemy()){
          showEnemy = true;
        }
        if(fishX > width /2 ){
          otherX = int(random(0, width/2));
        } else {
          otherX = int(random(width/2, width));        
        }
        otherY = int(random(waterLevel, coralLevel));
      }
    }
    
    
  }
}

//if the mouse over bait button (smile face)
function overBait() {
  if(mouseX>0 && mouseX<30 && mouseY>0 && mouseY<50)
    return true;
  else
    return false;
}

//if the mouse over enemy butoon (horrible face)
function overEnemy() {
  if(mouseX>width-30 && mouseX<width && mouseY>0 && mouseY<50)
    return true;
  else
    return false;
}