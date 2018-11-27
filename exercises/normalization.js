var people = [{
  id: 1,
  name: "Aegon Targaryen",
  children: [{
    id: 2,
    name: "Jaehaerys Targaryen",
    children: [{
      id: 4,
      name: "Daenerys Targaryen"
    },{
      id: 5,
      name: "Rhaegar Targaryen",
      children: [{
        id: 6,
        name: "Aegon Targaryen"
      }]
    }] 
  },{
    id: 3,
    name: "Rhaelle Targaryen"
  }],
}];

var output = [];
var obj = {};

function normalize(input){
  for(var i=0;i<input.length;i++){
    obj = {
      id: input[i].id,
      name: input[i].name,
      children: []
    };
    if(input[i].children===undefined){
      output.push(obj);
    }else{
      for(var j=0;j<(input[i].children).length;j++){
        (obj.children).push(input[i].children[j].id);
      }
      output.push(obj);
      normalize(input[i].children);
    }
  }
}
normalize(people);
console.log(output);
