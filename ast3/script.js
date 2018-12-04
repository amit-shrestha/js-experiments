var GAME_WIDTH = 750;
var GAME_HEIGHT = 500;
var score = 0;
var counter = 0;

var container = document.getElementsByClassName('container')[0];
var gameOver = document.createElement('div');
gameOver.style.background = "url('images/gameover.jpg')";
gameOver.style.position = 'absolute';
gameOver.style.zIndex = '1';
gameOver.style.display = 'none';
gameOver.style.opacity = '0.9';
gameOver.style.width = GAME_WIDTH+'px';
gameOver.style.height = GAME_HEIGHT+'px';
container.appendChild(gameOver);
var scoreBoard = document.createElement('div');
scoreBoard.style.position = 'absolute';
scoreBoard.style.zIndex = '1';
scoreBoard.innerHTML=["Score: "+score];
container.appendChild(scoreBoard);
// var style = {
//   containerStyle: {
//     background: "url('images/background.png') repeat-x",
//     width: GAME_WIDTH+'px',
//     height: GAME_HEIGHT+'px',
//     left: '25%',
//     overflow: 'hidden',
//     position: 'relative'
//   },
  
//   birdStyle: {
//     width: '32px',
//     height: '30px',
//     left: '250px',
//     top: '315px',
//     background: "url('images/bird.png') no-repeat",
//     position: 'absolute',
//   }
// }
//applyStyle(style.containerStyle, container);
container.style.background = "url('images/background.png') repeat-x";
container.style.width = GAME_WIDTH+'px';
container.style.height = GAME_HEIGHT+'px';
container.style.left = '25%';
container.style.overflow = 'hidden';
container.style.position = 'relative';
var up=false;
var groundArray;
var pipeArray;
var pipeInterval;
var interval;

document.addEventListener("keyup", function(e){
  if(e.keyCode==32){
    up=false;
  }
});
document.addEventListener("keydown", function(e){
  if(e.keyCode==32){
    up=true;
  }
});
// function applyStyle(style, element){
//   Object.keys(style).forEach(function(styleKey){
//     element.style[styleKey] = style[styleKey];
//   })
// }
function Bird(){
  var that = this;
  this.width = 32;
  this.height = 30;
  this.x = 250;
  this.y = 200;
  this.speed = 0;
  this.down = 0.8;
  this.up = -5;
  this.element;

  this.init = function(){
    this.element = document.createElement('div');
    this.element.style.width = this.width+'px';
    this.element.style.height = this.height+'px';
    this.element.style.left = this.x+'px';
    this.element.style.top = this.y+'px';
    this.element.style.background = "url('images/bird.png') no-repeat";
    this.element.style.position = 'absolute';
    //applyStyle(style.birdStyle, this.element);
    container.appendChild(this.element);
    interval = setInterval(this.update, 25);
  }

  this.update = function(){
    if(that.speed< -5){
      that.speed = -5;
    }

    that.checkCollison();
    if(counter < 5 ){
      that.element.style.backgroundPosition = 'left';
      counter++;
    }else if(counter < 10){
      that.element.style.backgroundPosition = 'center';
      counter++;
    }else if(counter < 15){
      that.element.style.backgroundPosition = 'center';
      counter = 0;
    }
    if(up==true){
      that.speed += that.up;
      that.y +=that.speed;
      that.element.style.top = that.y+'px';
    }else if(up==false){
      that.speed += that.down;
      that.speed *= 0.9;
      that.y += that.speed;
      that.element.style.top = that.y+'px';
    }
  }
  
  this.checkCollison = function(){
    if(that.y+that.height>=430 || that.y<=0){
      that.y=390;
      that.element.style.top = that.y+'px';
      clearInterval(interval);
      clearInterval(pipeInterval);
      gameOver.style.display = 'block';
    }
    for(var i=0;i<pipeArray.length;i++){
      if(that.x+that.width>=pipeArray[i].x && that.x<=pipeArray[i].x+pipeArray[i].width){
        if(that.y<=pipeArray[i].heightTop || that.y+that.height>=pipeArray[i].yBottom){
          clearInterval(interval);
          clearInterval(pipeInterval);
          gameOver.style.display = 'block';
        }
      }
    }
  }
}

function Pipe(initialPosition){
  var that = this;
  this.width = 58;
  this.headHeight = 27;
  this.heightTop = getRandomNumber(20, 200);
  this.heightBottom = 430-(this.heightTop+100);
  this.x = initialPosition;
  this.yTop = 0;
  this.yBottom = 430-this.heightBottom;
  this.speed = -1;
  this.elementTop = document.createElement('div');
  this.elementTop.style.left = this.x+'px';
  this.elementTop.style.top = this.yTop+'px';
  this.elementTop.style.width = this.width+'px';
  this.elementTop.style.height = this.heightTop+'px';
  this.elementTop.style.background = "url('images/pipe-background.png') repeat-y";
  this.elementTop.style.backgroundPosition = 'center';
  this.elementTop.style.position = 'absolute';
  container.appendChild(this.elementTop);

  this.elementHeadTop = document.createElement('div');
  this.elementHeadTop.style.left = this.x+'px';
  this.elementHeadTop.style.top = this.heightTop-this.headHeight+'px';
  this.elementHeadTop.style.width = this.width+'px';
  this.elementHeadTop.style.height = this.headHeight+'px';
  this.elementHeadTop.style.background = "url('images/pipe-head.png') no-repeat";
  this.elementHeadTop.style.position = 'absolute';
  container.appendChild(this.elementHeadTop);

  this.elementBottom = document.createElement('div');
  this.elementBottom.style.left = this.x+'px';
  this.elementBottom.style.top = this.yBottom+this.headHeight+'px';
  this.elementBottom.style.width = this.width+'px';
  this.elementBottom.style.height = this.heightBottom-this.headHeight+'px';
  this.elementBottom.style.background = "url('images/pipe-background.png') repeat-y";
  this.elementBottom.style.backgroundPosition = 'center';
  this.elementBottom.style.position = 'absolute';
  container.appendChild(this.elementBottom);

  this.elementHeadBottom = document.createElement('div');
  this.elementHeadBottom.style.left = this.x+'px';
  this.elementHeadBottom.style.top = this.yBottom+'px';
  this.elementHeadBottom.style.width = this.width+'px';
  this.elementHeadBottom.style.height = this.headHeight+'px';
  this.elementHeadBottom.style.background = "url('images/pipe-head.png') no-repeat";
  this.elementHeadBottom.style.position = 'absolute';
  container.appendChild(this.elementHeadBottom);

  this.move = function(){
    that.x+=that.speed;
    that.elementTop.style.left = that.x+'px';
    that.elementHeadTop.style.left = that.x+'px';
    that.elementBottom.style.left = that.x+'px';
    that.elementHeadBottom.style.left = that.x+'px';
  }
  this.remove = function(){
    container.removeChild(this.elementTop);
    container.removeChild(this.elementHeadTop);
    container.removeChild(this.elementBottom);
    container.removeChild(this.elementHeadBottom);
  }
  
}

function Ground(initialPosition){
  var that = this;
  this.x = initialPosition;
  this.y = 430;
  this.width = 750;
  this.height = 70;
  this.speed = -1;
  
  this.element = document.createElement('div');
  this.element.style.left = this.x+'px';
  this.element.style.top = this.y+'px';
  this.element.style.width = this.width+'px';
  this.element.style.height = this.height+'px';
  this.element.style.background = "url('images/ground.png') repeat-x";
  this.element.style.position = 'absolute';
  container.appendChild(this.element);
  
  this.move = function(){
    that.x+=that.speed;
    that.element.style.left = that.x;
  }

  this.remove = function(){
    container.removeChild(that.element);
  }

}

function Score(){
  for(var i=0;i<pipeArray.length;i++){
    if(pipeArray[i].x==190){
      score +=1;
      scoreBoard.innerHTML=('Score: '+score);
    }
  }
}

function getRandomNumber(min, max){
  return Math.floor(Math.random()*(max-min)+min);
}
function Game(){
  this.init = function(){
    new Bird().init();
    pipeArray=[new Pipe(600), new Pipe(900), new Pipe(1200)];
    groundArray=[new Ground(0), new Ground(749), new Ground(1499)];
    pipeInterval = setInterval(function(){
      for(var i=0;i<pipeArray.length;i++){
        pipeArray[i].move(); 
        if(pipeArray[i].x<=-50){
          pipeArray[i].remove();
          pipeArray.shift();
          pipeArray.push(new Pipe(850));
        }
      }
      for(var j=0;j<groundArray.length;j++){
        groundArray[j].move();
        if(groundArray[j].x<=-750){
          groundArray[j].remove();
          groundArray.shift();
          groundArray.push(new Ground(900));
        }
      }
      Score();
    }, 10);
  }
}

new Game().init();