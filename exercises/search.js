var fruits = [
  {id: 1, name: 'Banana', color: 'Yellow'},
  {id: 2, name: 'Apple', color: 'Red'}
]

function searchByName(arr, name){
  for(var i=0;i<arr.length;i++){
    if(arr[i].name === name){
      return arr[i];
    }
  }
}

function searchByKey(arr, key, name){
  for(var i=0;i<arr.length;i++){
    if(arr[i][key] === name){
      return arr[i];
    }
  }
}

console.log(searchByName(fruits, 'Apple'));
console.log(searchByKey(fruits, 'name', 'Banana'));