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

  var dots = [];
  var dotsBtn = document.createElement('div');
  dotsBtn.setAttribute('id', 'dots');

  for(var i=0;i<images.length;i++){
    images[i].setAttribute('class', 'images');
    images[i].style.width = width+'px';
    images[i].style.height = height+'px';
    var dot = document.createElement('span');
    dot.setAttribute('class', 'dot');
    dot.setAttribute('id', i);
    dotsBtn.appendChild(dot);
    dots.push(dot);
  }

  for(var x=0;x<dots.length;x++){
    dots[x].addEventListener('click', function(e){
      dotClicked(e.path[0].id);
    });
  }

  container.appendChild(nextBtn);
  container.appendChild(previousBtn);
  container.appendChild(dotsBtn);
  
  document.body.appendChild(container);

  container.style.width = width+'px';
  container.style.height = height+'px';
  slider.style.width = width*images.length+'px';
  slider.style.height = height+'px';

  nextBtn.addEventListener('click', function(){
    nextBtnClicked();
  });
  previousBtn.addEventListener('click', function(){
    previousBtnClicked();
  });


  var x = 0;
  var flag = 1;
  var change = -1;
  var count = 0;
  var move = 1;
  var mainInterval;
  var newInterval;
  var hold;

  init();

  function slide(){
    slider.style.left = x+'px';
    updateDotColor();
    if(x==((images.length-1)*width*change)){
      change = 1;
      flag = -1;
    }else if(x == 0){
      change = -1;
      flag = 1;
    }
    if(x==count*width*change*flag){
      clearInterval(newInterval);
      clearInterval(mainInterval);
      hold = setTimeout(init, wait);
      if(flag == 1) count++;
      else if(flag == -1) count--;
    }
    x += move*change;
  }

  function init(){
    mainInterval = setInterval(slide, animationDelay);
  }

  function nextBtnClicked(){
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

  function previousBtnClicked(){
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

  function dotClicked(id){
    if(id>count){
      flag = 1;
      change = -1;
      count = id;
    }else if(id<count){
      flag = -1;
      change = 1;
      count = id;
    }
    clearInterval(mainInterval);
    clearInterval(newInterval);
    clearTimeout(hold);
    newInterval = setInterval(slide, 1);
  }

  function updateDotColor(){
    for(var i=0;i<dots.length;i++){
      if(x==i*width*change*flag) dots[i].classList.add('active');
      else dots[i].classList.remove('active');
    }
  }

}
imageCarousel('slider-container', 750, 500, 1000, 7);