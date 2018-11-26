var input = ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock'];
var result = {};
var output = input.reduce(function(acc, val){
  if(!acc[val]){
    acc[val] = 1;
    return acc;
  }
  acc[val]++;
  return acc;
}, result);

console.log(output);