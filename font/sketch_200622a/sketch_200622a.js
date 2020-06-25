let font;
let vehicles = [];

function preload(){
  
  font = loadFont('KronaOne-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(51);
  textFont(font);
    
  let points = font.textToPoints('Code',windowWidth/2 - 350,windowHeight/2+50,200);
   
  points.forEach((p) => {
     let vehicle = new Vehicle(p.x,p.y);
     vehicles.push(vehicle);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  vehicles.forEach((v) => {
     v.behaviors();
     v.update();
     v.show();
  });
}
