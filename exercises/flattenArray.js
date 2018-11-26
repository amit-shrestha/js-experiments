var input = [[1, 2, 3], [2, 4, 5], 6, 7];
var output = [];

// output = input.flat();
// console.log(output);

//Alternative
for(var i=0;i<input.length;i++){
  if(!checkArray(input[i])){
    if(!checkRepeatition(input[i])){
      output.push(input[i]);
    }
  }else{
    input[i].forEach(function(newVal){
      input.push(newVal);
    })
  };
}

function checkArray(val){
  return Array.isArray(val);
}

function checkRepeatition(number){
  for(var j=0;j<output.length;j++){
    if(output[j]==number){
      return true;
    }
  }
  return false;
}
console.log(output);
