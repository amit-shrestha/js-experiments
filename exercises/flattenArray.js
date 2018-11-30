var input = [[1, 2, 3], [2, 4, 5, [8, 9]], 6, 7, {name: 'John'}];
var output = [];

// output = input.flat();
// console.log(output);

//Using For loop
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
console.log('Using For loop', output);

//Using reduce
function flatArray(input, result){
  var output = input.reduce(function(array, val){
    if(Array.isArray(val)){
      array = flatArray(val, array);
    }else if(array.indexOf(val)==-1){
      array.push(val);
    }
    return array;
  }, result);
  return output;
}

console.log('Using Reduce', flatArray(input, []));





