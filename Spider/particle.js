function Particle(x,y){
  this.pos = createVector(x,y);
  this.target = createVector(x,y);
  this.r = 5;
}


Particle.prototype.show = function(){
     stroke("#FFF2BE");
     strokeWeight(this.r);
     point(this.pos.x,this.pos.y);
};

Particle.prototype.getCoords = function(){
  return(this.pos);
};
