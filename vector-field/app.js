let particles = [];
let gridDim = {};
let spacer;

//init
function setup() {
  createCanvas(windowWidth, windowHeight);
  gridDim.start = { x: width / 6, y: height / 4 };
  gridDim.end = { x: width - width / 6, y: height - height / 4 };
  spacer = 50;

  for (let x = gridDim.start.x; x < gridDim.end.x; x += spacer) {
    for (let y = gridDim.start.y; y < gridDim.end.y; y += spacer) {
      particles.push(new p5.Vector(x, y));
    }
  }
}

//for resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//draw
function draw() {
  background("#2E3959");
  stroke("#F28F38");
  strokeWeight(4);

  particles.forEach((p) => {
    let angle = new p5.Vector(mouseX - p.x, mouseY - p.y);

    line(
      p.x,
      p.y,
      p.x + 15 * Math.cos(angle.heading()),
      p.y + 15 * Math.sin(angle.heading())
    );
  });
}
