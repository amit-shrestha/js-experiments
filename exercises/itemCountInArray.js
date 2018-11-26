var input = ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock'];

var output = input.reduce(function(acc, val){
  if(!acc[val]){
    acc[val] = 1;
    return acc;
  }
  acc[val]++;
  return acc;
}, {});

console.log(output);