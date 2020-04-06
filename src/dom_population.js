import projectFactory from './factories'
import {taskExpandListener, completedBtnListener, addDescriptionListener, deleteTaskListener, addImportance} from './events'


function populateView(obj){
  let view = document.querySelector('.viewer');
  let headerDiv = document.createElement('div');
  let outerTaskContainer = document.createElement('div');
  outerTaskContainer.setAttribute('class', 'submitted-task-container');
  let innerTaskContainer = document.createElement('div');
  innerTaskContainer.setAttribute('class', 'tasks');
  innerTaskContainer.setAttribute('data-project', obj.name);
  innerTaskContainer.setAttribute('data-date', obj.date);
  outerTaskContainer.appendChild(innerTaskContainer);
  headerDiv.setAttribute('class', 'task-header');
  headerDiv.setAttribute('data-project', obj.name);
  headerDiv.setAttribute('data-date', obj.date);
  let h3 = document.createElement('h3');
  h3.innerHTML = obj.name;
  headerDiv.appendChild(h3);
  // view.insertBefore(headerDiv, view.childNodes[0]);
  // view.insertBefore(outerTaskContainer, view.childNodes[1]);
  view.appendChild(headerDiv);
  appendEmptyTasksImg(obj, view);
  view.appendChild(outerTaskContainer);
  printTasks(obj.tasks, innerTaskContainer);
}

function populateMenu(obj){
  let menu = document.querySelector('.lists');
  let li = document.createElement('li');
  li.dataset.project = obj.name;
  li.dataset.date = obj.date;
  li.classList.add('menu-item');
  li.classList.add('active-projects');
  let breakDiv = document.createElement('div');
  breakDiv.classList.add('break');

  let html = `<i class="far fa-bookmark"></i>
              <span class="text">${obj.name}</span>
              <i class="fas fa-times-circle"></i>`;
  menu.appendChild(breakDiv);
  li.insertAdjacentHTML('afterbegin', html);
  menu.appendChild(li);
}

function removeProjectAndBreak(element){
  let breakDiv = element.previousSibling;
  breakDiv.parentNode.removeChild(breakDiv);
  element.parentNode.removeChild(element);
}

function loadWelcomeBackMessage(){
  document.querySelector('')
}

function removeTask(ele){
  ele.parentNode.removeChild(ele);
}

function animateProjectDeletion(element){
  element.classList.add('removed-item');
}


function clearViewBoard(){
  const viewer = document.querySelector('.viewer');
  Array.from(viewer.childNodes).forEach((node) => {
    if(node.className != 'input-container-task'){
        node.parentNode.removeChild(node);
    } else {
        return
    }
  })
}

function clearEmptyImg(){
  let img = document.querySelector('.empty-project-img');
  if(img){
    img.parentNode.removeChild(img);
  }
}

function appendEmptyTasksImg(obj, viewer){
  if(obj.tasks.length == 0){
    let img = document.createElement('img');
    img.setAttribute('src', 'static/imgs/undraw_online_calendar_kvu2.svg');
    img.classList.add('empty-project-img');
    img.classList.add('reveal');
    viewer.appendChild(img);
  }
}

function viewAfterProjectDeletion(viewer){
  clearViewBoard();
  let div = document.createElement('div');
  div.classList.add('task-header');
  let h3 = document.createElement('h3');
  h3.innerHTML = 'Create a New Project or Add a New Task'
  div.appendChild(h3);
  viewer.appendChild(div);
  let img = document.createElement('img');
  img.setAttribute('src', 'static/imgs/undraw_certification_aif8.svg');
  img.classList.add('empty-project-img');
  img.classList.add('reveal');
  viewer.appendChild(img);
}

function reprintFlags(obj){
  if(obj.importance == undefined){
    return `<i class="far fa-flag green"></i>
      <i class="far fa-flag yellow"></i>
      <i class="far fa-flag red"></i>`
  } else if(obj.importance == "green"){
        return `<i class="far fa-flag green"></i>
      <i class="far fa-flag yellow hide-flag"></i>
      <i class="far fa-flag red hide-flag"></i>`
    } else if(obj.importance == "yellow"){
        return `<i class="far fa-flag green hide-flag"></i>
      <i class="far fa-flag yellow"></i>
      <i class="far fa-flag red hide-flag"></i>`
    } else {
        return `<i class="far fa-flag green hide-flag"></i>
      <i class="far fa-flag yellow hide-flag"></i>
      <i class="far fa-flag red"></i>`
    }
}

function addTask(obj, parent){

  let singleTaskDiv = document.createElement('div');
  singleTaskDiv.setAttribute('class', 'single-task');
  if(obj.isCompleted == true){
    singleTaskDiv.classList.add('clicked');
  }
  singleTaskDiv.setAttribute('data-date', obj.date);
  let singleTask = `<button class="circle"></button>
    <h4 class="task-name">${obj.name}</h4>
    <div class="flag-container">
      ${reprintFlags(obj)}
    </div>
    <div class="deletebtn-container">
      <i class="delete-task-btn fas fa-times-circle"></i>
    </div>
    <div class="note-container">
      <textarea class="note-area" type="text-area" placeholder="${obj.description}"></textarea>
      <i class="submit-description fas fa-plus"></i>
    </div>`;
    clearEmptyImg();
    singleTaskDiv.insertAdjacentHTML('afterbegin', singleTask);
    parent.appendChild(singleTaskDiv);
}

function printTasks(arr, parent){
  if(arr.length != 0){
    arr.forEach((obj, i) => {
      addTask(obj, parent);
      taskExpandListener();
      completedBtnListener();
      addDescriptionListener();
      deleteTaskListener();
      addImportance();
    })
  }
}

function hideAddTaskBar(){
  document.querySelector('.input-container-task').classList.add('hide');
}

function revealAddTaskBar(){
  document.querySelector('.input-container-task').classList.remove('hide');

}



export {hideAddTaskBar, revealAddTaskBar, populateView, populateMenu, removeProjectAndBreak, animateProjectDeletion, addTask, viewAfterProjectDeletion, removeTask, clearViewBoard}
