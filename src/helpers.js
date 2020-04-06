//helper for returning last of Array
function returnLast(arr){
  return arr[arr.length - 1];
}

//helper for nodelist conversions
function nodeListLoop(node){
  node = Array.from(node);
  return node;
}

function removeProjectOrTask(arr, obj){
  arr.splice(arr.indexOf(obj[0]), 1);
}

function sortImportance(str){
  if(str.includes("green")){
    return "green";
  } else if(str.includes("yellow")){
    return "yellow";
  } else {
    return "red";
  }
}


function hideFlags(target, color){
  if(target.className.includes('fa-flag')){
    Array.from(target.parentElement.childNodes).forEach((node) => {
      if(node.className){
        if(node.className.includes('fa-flag')){
          if(!node.className.includes(color)){
            node.classList.toggle('hide-flag');
          }
        }
      }
    })
  }
}


export {returnLast, nodeListLoop, removeProjectOrTask, sortImportance, hideFlags}
