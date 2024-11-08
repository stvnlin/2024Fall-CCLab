let trail = [];
let maxTrail = 30;
let particles = [];
let maxParticle = 100;
let lastMouseX = 0;
let lastMouseY = 0;


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");

  // colorMode(HSB);
  // color = random(255);
  
}

function draw() {
  background(0, 0, 100);
  noStroke();

   //console.log(mouseX, lastMouseX, mouseX - lastMouseX);

 if (particles.length < maxParticle) {
    let dx = random(-1, 1);
    let dy = random(-1, 1);
    particles.push(new ParticleClass(mouseX, mouseY, dx, dy));
  }

  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    
    
    if (particles[i].speedX < 0.5 && particles[i].speedY < 0.5) {
      particles.splice(i, 1);
    }
  }
  trail.push(new trailPoint(mouseX, mouseY));

  if(trail.length > maxTrail){
    trail.splice(0, 1);
  }

  for (let i = 0; i < trail.length; i++) {
    trail[i].display();
  }


 

  lastMouseX = mouseX;
  lastMouseY = mouseY;

}

class trailPoint {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.visual = 255;
      this.size = 20;
  }

  display() {
      fill(0, 200, 255, this.visual); 
      noStroke();
      circle(this.x, this.y, this.size);  

      this.visual -= 15; 
      this.size *= 0.9;

      if (this.visual < 0) {
          this.visual = 0; 
      }

      if (this.size < 0) {
        this.size = 0; 
    }
  }
}


class ParticleClass {
  constructor(x, y, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.speedX = map(mouseX - lastMouseX, -5, 5, -8, 8, true);
      this.speedY = map(mouseY - lastMouseY, -5, 5, -8, 8, true);
      this.size = random(1, 10);
      this.drag = random(0.92, 0.98);
      
  }

  
  update() {
      this.speedX *= this.drag;
      this.speedY *= this.drag;
      this.x += this.speedX;
      this.y += this.speedY;
      
  }

  
  display() {
      fill(random(150, 200), random(200, 250), 255);
      noStroke();
      circle(this.x, this.y, this.size);
  }
}
