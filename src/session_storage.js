import {populateMenu} from './dom_population'
import {deleteProjectListener, projectViewListener} from './events'

function updateStorage(sessionArr = '', arr){
  return sessionStorage.setItem(sessionArr, JSON.stringify(arr));
}

function retrieveStorage(){
  if(sessionStorage.projectArr.length == 0){
    let newArray = new Array();
    return newArray;
  } else {
    let a = JSON.parse(sessionStorage.getItem('projectArr'));
    return a;
  }
}

function loadStorage(){
  if(!sessionStorage.projectArr){
    createStorage();
  } else {
    let currentStorage = retrieveStorage();
    currentStorage.forEach((obj) => {
      populateMenu(obj);
      deleteProjectListener();
      projectViewListener();
    })
  }
}

function createStorage(){
  return sessionStorage.setItem('projectArr', "");
}



export {updateStorage, retrieveStorage, loadStorage}
