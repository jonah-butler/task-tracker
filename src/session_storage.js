import {populateMenu} from './dom_population'
import {deleteProjectListener, projectViewListener} from './events'

function updateStorage(sessionArr = '', arr){
  return localStorage.setItem(sessionArr, JSON.stringify(arr));
}

function retrieveStorage(){
  if(localStorage.projectArr.length == 0){
    let newArray = new Array();
    return newArray;
  } else {
    let a = JSON.parse(localStorage.getItem('projectArr'));
    return a;
  }
}

function loadStorage(){
  if(!localStorage.projectArr){
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
  return localStorage.setItem('projectArr', "");
}



export {updateStorage, retrieveStorage, loadStorage}
