let particles = [];
let gridDim = {};
let spacer;
let thickness = 50;
let MAX_SPEED = 10,
  MAX_FORCE = 1.5;

class Point {
  constructor(x, y, vX = 0, vY = 0, aX = 0, aY = 0) {
    this.origin = createVector(x, y);
    this.location = createVector(x, y);
    this.velocity = createVector(vX, vY);
    this.acceleration = createVector(aX, aY);
  }

  display() {
    stroke(255);
    circle(this.location.x, this.location.y, 1);
  }

  update() {
    this.location.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  getLocation() {
    return { cX: this.location.x, cY: this.location.y };
  }

  getOrigin() {
    return { x: this.origin.x, y: this.origin.y };
  }
  applyForce(f) {
    this.acceleration.add(f);
  }
  comeBack(f) {
    let target = p5.Vector.sub(this.origin, f);
    let distance = target.mag();
    let speed = MAX_SPEED;

    if (distance < thickness) {
      speed = map(distance, 0, 100, 0, MAX_SPEED);
    }

    target.setMag(speed);

    let steer = p5.Vector.sub(target, this.velocity);
    steer.limit(MAX_FORCE);

    return steer;
  }

  move(f) {
    let target = p5.Vector.sub(f, this.origin);
    let distance = target.mag();

    if (distance < thickness) {
      target.setMag(MAX_SPEED);
      target.mult(-1);

      let steer = p5.Vector.sub(target, this.velocity);
      steer.limit(MAX_FORCE);

      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  behaviour() {
    let comeBack = this.comeBack(this.location);
    let mouse = createVector(mouseX, mouseY);
    let move = this.move(mouse);

    comeBack.mult(1);
    move.mult(5);

    this.applyForce(comeBack);
    this.applyForce(move);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gridDim.start = { x: width / 6, y: height / 4 };
  gridDim.end = { x: width - width / 6, y: height - height / 4 };
  spacer = 15;

  for (let x = gridDim.start.x; x < gridDim.end.x; x += spacer) {
    for (let y = gridDim.start.y; y < gridDim.end.y; y += spacer) {
      particles.push(new Point(x, y));
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  particles.forEach((p) => {
    p.behaviour();
    p.update();
    p.display();
  });
}
