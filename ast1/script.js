function imageCarousel(sliderContainer, width, height, wait, animationDelay){
  var slider = document.getElementById(sliderContainer);
  var images = slider.getElementsByTagName('img');
  
  var container = document.createElement('div');
  container.setAttribute('id', 'slider-container-wrapper');
  container.appendChild(slider); 
  
  var nextBtn = document.createElement('img');
  nextBtn.src = './images/chevron-right.png';
  
  var previousBtn = document.createElement('img');
  previousBtn.src = './images/chevron-left.png';
  
  nextBtn.setAttribute('id', 'rbtn');
  previousBtn.setAttribute('id', 'lbtn');

  var dotsBtn = document.createElement('div');
  dotsBtn.setAttribute('id', 'dots');

  for(var i=0;i<images.length;i++){
    images[i].setAttribute('class', 'images');
    dotsBtn.appendChild(document.createElement('span'));
  }

  var dots = dotsBtn.getElementsByTagName('span');
  for(var j=0;j<dots.length;j++){
    dots[j].setAttribute('class', 'dot');
  }

  container.appendChild(nextBtn);
  container.appendChild(previousBtn);
  container.appendChild(dotsBtn);
  
  document.body.appendChild(container);

  container.style.width = width+'px';
  container.style.height = height+'px';
  slider.style.width = width*images.length+'px';
  slider.style.height = height+'px';

  var y = 2;
  var flag = 1;
  var change = -1;
  var count = 0;
  var move = 1;
  var mainInterval;
  var newInterval;
  var hold;

  this.slide = function(){
    slider.style.left = y+'px';
    if(y==((images.length-1)*width*change)){
      change = 1;
      flag = -1;
    }else if(y == 0){
      change = -1;
      flag = 1;
    }
    if(y==count*width*change*flag){
      clearInterval(newInterval);
      clearInterval(mainInterval);
      hold = setTimeout(this.init, 1000);
      if(flag == 1){
        count++;
      }else if(flag == -1){
        count--;
      }
    }
    y += move*change;
  }

  this.init = function(){
    mainInterval = setInterval(this.slide, 10);
  }

  nextBtn.addEventListener('click', function(e){
    if(flag==-1){
      flag=1;
      change=-1;
      count++;
    }
    clearInterval(mainInterval);
    clearInterval(newInterval);
    clearTimeout(hold);
    newInterval = setInterval(this.slide, 1);
  });

  previousBtn.addEventListener('click', function(e){
    if(flag==1){
      flag=-1;
      change=1;
      count--;
    }
    clearInterval(mainInterval);
    clearInterval(newInterval);
    clearTimeout(hold);
    newInterval = setInterval(this.slide, 1);
  });

}
new imageCarousel('slider-container', 750, 500, 1000, 10).init();