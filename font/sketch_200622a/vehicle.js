function Vehicle(x,y){
    this.pos = createVector(random(width),random(height));
    this.target = createVector(x,y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 4;
    this.maxspeed = 10;
    this.maxforce = 1;
}

Vehicle.prototype.behaviors = function(){
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);
    
    arrive.mult(0.75);
    flee.mult(3);
    
    this.applyForce(arrive);
    this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f){
    this.acc.add(f);
}

Vehicle.prototype.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
};


Vehicle.prototype.show = function(){
     stroke(255);
     strokeWeight(this.r);
     point(this.pos.x,this.pos.y);
};

////behaviours

Vehicle.prototype.flee = function(target){
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    if(d<50){
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    }
    else{
      return createVector(0,0);
    }
    
};

Vehicle.prototype.arrive = function(target){
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    let speed = this.maxspeed;
    if(d<100){
      speed = map(d, 0,100,0,speed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
};
