var container = document.getElementById('slider-container-wrapper');
var slider = document.getElementById('slider-container');
var images = document.getElementsByClassName('images');
var nextBtn = document.getElementById('rbtn');
var previousBtn = document.getElementById('lbtn');

nextBtn.addEventListener('click', function(e){
  if(flag==1){
    clearInterval(mainInterval);
    newInterval = setInterval(slide, 1);
  }else if(flag==-1){
    flag=1;
    change=-1;
    count++;
    clearInterval(mainInterval);
    newInterval = setInterval(slide, 1);
  } 
});

previousBtn.addEventListener('click', function(e){
  if(flag==1){
    flag=-1;
    change=1;
    count--;
    clearInterval(mainInterval);
    newInterval = setInterval(slide, 1);
  }else if(flag==-1){
    clearInterval(mainInterval);
    newInterval = setInterval(slide, 1);
  } 
});

container.style.left = '25%';
var coordinate = {
  y: 0
};
var flag = 1;
var change = -1;
var width = 750;
var move = 1;
var count = 0;
var wait = 1000;
var animationDelay = 1;
var hold;
var mainInterval;
var newInterval;
function slide(){
  slider.style.left = coordinate.y+'px';
  console.log(count);
  if(coordinate.y==((images.length-1)*width*change)){
    change = 1;
    flag = -1;
  }else if(coordinate.y==0){
    change = -1;
    flag =1;
  } 
  if(coordinate.y==count*width*change*flag){
    clearInterval(newInterval);
    clearInterval(mainInterval);
    hold = setInterval(main, 2000);
    if(flag == 1){
      count++;
    }else if(flag == -1){
      count--;
    }
    if(count>=3){
      count=1;
    }
    if(count<=0){
      count=0;
    }
  }
  coordinate.y+=move*change;
}

function main(){
  clearInterval(hold);
  mainInterval = setInterval(slide, animationDelay);
}

main();