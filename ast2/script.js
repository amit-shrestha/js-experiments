mainHeight = 500;
mainWidth = 750;
numberOfBoxes = 10;
var container = document.getElementById('container');
container.style.width = mainWidth+'px';
container.style.height = mainHeight+'px';
container.style.border = '2px solid red';
container.style.position = 'relative';
container.style.left = '25%';

function getRandomNumber(min, max){
  return Math.floor(Math.random()*(max-min)+min);
}
function getRandomColor(){
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomDirection(){
  var randomNumber = getRandomNumber(0, 2);
  var direction = 1;
  if(randomNumber==0){
    direction = -1;
  }else if(randomNumber==1){
    direction = 1;
  }
  return direction;
}
function detectPreCollision(property){
  boxArray.forEach(function(val){
    console.log('detectPreCollision');
    console.log(property);
    if(property.x<(val.x+val.width) && (property.x+property.width)>val.x && property.y<(val.y+val.height) && (property.y+property.width)>val.y==true){
      console.log('overlap detected');
      return true;
    }
    return false;
  });
}
var properties={};
function Box(properties){
  var that = this;
  this.x = properties.x;
  this.y = properties.y;
  this.width = properties.width;
  this.height = properties.height;
  this.color = properties.color;
  this.xDirection = properties.xDirection;
  this.yDirection = properties.yDirection;
  this.element;
  
  this.drawBox=function(){
    this.element = document.createElement('div');
    this.element.style.left = properties.x+'px';
    this.element.style.top = properties.y+'px';
    this.element.style.width = properties.width+'px';
    this.element.style.height = properties.height+'px';
    this.element.style.backgroundColor = properties.color;
    this.element.style.position = 'absolute';
    container.appendChild(this.element);
  }
  this.moveBox=function(){
    this.detectCollision();
    this.detectBoundary();
    this.x += this.xDirection;
    this.y += this.yDirection;
    this.element.style.left = this.x+'px';
    this.element.style.top = this.y+'px';
  }
  this.detectBoundary=function(){
    if(this.x>=(mainWidth-this.width) || this.x<=0){
      this.xDirection = -1*this.xDirection;
    }
    if(this.y>=(mainHeight-this.height) || this.y<0){
      this.yDirection = -1*this.yDirection;
    }
  }
  this.detectCollision = function(){
    boxArray.forEach(function(box){
      if(that.x+that.width>=box.x && that.x<=box.x+box.width && that.y+that.height>=box.y && that.y<=box.y+box.height){
        var tempX = that.xDirection;
        var tempY = that.yDirection;
        that.xDirection = box.xDirection;
        that.yDirection = box.yDirection;
        box.xDirection = tempX;
        box.yDirection = tempY;
      }
    });
  }
}
var boxArray=[];
var res = false;
function Game(){
  var interval;
  var j = 0;
  this.init = function(){
    for(var i=0;i<numberOfBoxes;i++){
      properties={
        width: getRandomNumber(30, 50), 
        height: getRandomNumber(30, 50),
        x: getRandomNumber(0, mainWidth-properties.width), 
        y:getRandomNumber(0, mainHeight-properties.height),   
        color: getRandomColor(),
        xDirection: getRandomDirection(),
        yDirection: getRandomDirection()
      }
      if(j!=0){
        console.log('test');
        console.log(res);
        res = detectPreCollision(properties);
        console.log(res);
      }
      if(!res){
        var box = new Box(properties);
        boxArray.push(box);
        j++;
        box.drawBox();
      }else{
        i--;
      }
    }
    interval = setInterval(this.move, 10);
  }
  this.move = function(){
    boxArray.forEach(function(box){
      box.moveBox();
    });
  }
}

new Game().init();
