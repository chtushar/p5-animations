let r;
let angle;
let step;
let particles = [];
let spacer = 100;
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  r = 200;
  angle = 0;
  step = TWO_PI/6;
  
  for (let x = -width; x < width; x += spacer) {
    for (let y = -height; y < height; y += spacer) {
      particles.push(new Particle(x, y));
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  
  particles.forEach((p,i) => {
      p.show();
      
      if(i < (particles.length - 1)){
        let {x,y} = particles[i+1].getCoords();
        let mX = mouseX - width/2;
        let mY = mouseY - height/2;
        strokeWeight(1);
        stroke("#FFF2BE");
        
        if(dist(mX, mY, x,y) < 200){
          line(mX, mY, x, y);
        }
      }
  });
  
}
