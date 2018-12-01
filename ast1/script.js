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

  nextBtn.addEventListener('click', nextBtnClicked);
  previousBtn.addEventListener('click', previousBtnClicked);

  var y = 2;
  var flag = 1;
  var change = -1;
  var count = 0;
  var move = 1;
  var mainInterval;
  var newInterval;
  var hold;

  init();

  function slide(){
    slider.style.left = y+'px';
    updateDotColor();
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
      hold = setTimeout(init, wait);
      if(flag == 1){
        count++;
      }else if(flag == -1){
        count--;
      }
    }
    y += move*change;
  }

  function init(){
    mainInterval = setInterval(slide, animationDelay);
  }

  function nextBtnClicked(e){
    if(flag==-1){
      flag=1;
      change=-1;
      count++;
    }
    clearInterval(mainInterval);
    clearInterval(newInterval);
    clearTimeout(hold);
    newInterval = setInterval(slide, 1);
  }

  function previousBtnClicked(e){
    if(flag==1){
      flag=-1;
      change=1;
      count--;
    }
    clearInterval(mainInterval);
    clearInterval(newInterval);
    clearTimeout(hold);
    newInterval = setInterval(slide, 1);
  }

  function updateDotColor(){
    if(flag == 1 && (y==count*width*change*flag+width/2 || y==count*width*change*flag)){
      dots[count].setAttribute('class', 'dot-active');
      if(count!=0){
        dots[(count-1)].setAttribute('class', 'dot');
      }
    }else if(flag == -1 && (y==(count+1)*width*change*flag+width/2 || y==count*width*change*flag)){
      dots[count].setAttribute('class', 'dot-active');
      if(count!=images.length-1){
        dots[(count+1)].setAttribute('class', 'dot');
      }
    }
  }

}
imageCarousel('slider-container', 750, 500, 1000, 10);