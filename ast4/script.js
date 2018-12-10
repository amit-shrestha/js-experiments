var wordContainer = document.getElementsByClassName('word-container')[0];
var scoreBoard = document.getElementsByClassName('score-board')[0];
var textInput = document.getElementsByClassName('text-input')[0];
var gameOver = document.getElementsByClassName('game-over')[0];
var wordsArray = ["valentino", "rossi", "maverick", "vinales", "marc", "marquez", "dani", "pedrosa", "jorge", "lorenzo", "marco", "simoncelli", "casey", "stoner", "cal", "crutchlow", "johann", "zarco", "andrea", "iannone", "andrea", "dovizioso", "hafiz", "syahrin"];
var moveInterval;
var wordInterval;
var generatedWordArray = [];
function getRandomNumber(min, max){
  return Math.floor(Math.random()*(max-min)+min);
}

function GenerateWord(){
  var word = wordsArray[getRandomNumber(0, wordsArray.length)];
  this.x = getRandomNumber(160, wordContainer.offsetWidth);
  this.y = 10;
  this.speed = 1;
  this.charArray = [];
  var that = this;


  this.init = function(){
    this.element = document.createElement('div');
    for(var i=0;i<word.length;i++){
      var span = document.createElement('span');
      this.charArray.push(word[i]);
      span.innerHTML = (word[i]);
      this.element.appendChild(span);
    }
    this.element.style.left = this.x+'px';
    this.element.style.top = this.y+'px';
    this.element.style.position = 'absolute';
    this.element.style.fontSize = 3+'em';
    wordContainer.appendChild(this.element);
  }

  this.update = function(){
    that.y+=that.speed;
    that.element.style.top = that.y+'px';
  }

  this.remove = function(){
      wordContainer.removeChild(that.element);
  }
  this.changeColor = function(length, color){
    var spanList = that.element.getElementsByTagName('span');
    for(var i=0;i<spanList.length;i++){
      if(i<length){
        spanList[i].style.color = color;
      }
      else{
        spanList[i].style.color = '';
      }
    }
  }
}

function Game(){
  var inputArray = [];
  var score = 0;
  textInput.textContent = '';
  scoreBoard.innerHTML = ('Score: '+score);
  this.init = function(){
    document.addEventListener('keydown', keyPress);
    wordInterval = setInterval(function(){
      var generateWord = new GenerateWord();
      generateWord.init();
      generatedWordArray.push(generateWord);
    }, 3000);
    
    moveInterval = setInterval(function(){
      for(var i=0;i<generatedWordArray.length;i++){
        generatedWordArray[i].update();
        if(generatedWordArray[i].y+generatedWordArray[i].element.offsetHeight>=wordContainer.offsetHeight){
          clearInterval(wordInterval);
          clearInterval(moveInterval);
          generatedWordArray = [];
          gameOver.style.display = 'block';
        }
      }
    }, 25); 
  }

  function keyPress(event){
    if(event.keyCode>=65 && event.keyCode<=90){
      inputArray.push(String.fromCharCode(event.keyCode).toLowerCase());
      compare();
    }
    if(event.keyCode==8){
      inputArray.pop();
      compare();
    }
    if(event.keyCode==13){
      match();
    }
  }

  function compare(){
    textInput.textContent = inputArray.join("");
    for(var i=0;i<generatedWordArray.length;i++){
      if(generatedWordArray[i].charArray.slice(0, inputArray.length).join("") === inputArray.join("")){
        generatedWordArray[i].changeColor(inputArray.length, 'green');
      }
      else{
        generatedWordArray[i].changeColor(generatedWordArray[i].charArray.length, '');
      }
    }
  }

  function match(){
    for(var i=0;i<generatedWordArray.length;i++){
      if(generatedWordArray[i].charArray.join("") === inputArray.join("")){
        generatedWordArray[i].remove();
        generatedWordArray.splice(i, 1);
        inputArray = [];
        score+=1;
        scoreBoard.innerHTML = ('Score: '+score);
        textInput.textContent = '';
        for(var j=0;j<generatedWordArray.length;j++){
          generatedWordArray[j].changeColor('');
        }
      }
    }
  }
}

new Game().init();
