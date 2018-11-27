var input = [[1, 2, 3], [2, 4, 5, [8, 9]], 6, 7, {name: 'John'}];
var output = [];

// output = input.flat();
// console.log(output);

//Alternative
for(var i=0;i<input.length;i++){
  if(!checkArray(input[i])){
    if(checkRepeatition(input[i])==-1){
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
  return output.indexOf(number);
}
console.log(output);

//Alternative
function flatArray(input, acc){
  var output = input.reduce(function(arr, val){
    if(Array.isArray(val)){
      arr = flatArray(val, arr);
    }else if(arr.indexOf(val) == -1){
      arr.push(val);
    }
    return arr;
  }, acc);
  return result;
}

console.log(flatArray(input, []));





