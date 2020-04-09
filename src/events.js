import {nodeListLoop, returnLast, removeProjectOrTask, sortImportance, hideFlags} from './helpers'
import projectArr from './data'
import {projectFactory, taskFactory} from './factories'
import {populateMenu, populateView, removeProjectAndBreak, animateProjectDeletion, addTask, viewAfterProjectDeletion, removeTask, clearViewBoard, hideAddTaskBar, revealAddTaskBar} from './dom_population'
import {projectLookup, taskLookup} from './lookup'
import {updateStorage, retrieveStorage} from './session_storage'

const hamburger = document.querySelector('.menu-toggle');
const submitBtn = document.querySelector('.submit-btn');
const projectField = document.querySelector('#newProject');
const taskField = document.querySelector('#newTask');
const taskSubmitBtn = document.querySelector('.task-submit-btn')

//event listener for top hamburger for screen expansion
 const hamburgerListener = () => {
  hamburger.addEventListener('click', () => {
    let viewer = document.querySelector('.viewer');
    let menu = document.querySelector('.menu');

    viewer.classList.toggle('displayToggle');
    menu.classList.toggle('displayToggle');
  })
}


// event listener for add project button
const slidingBtnListener = () => {
  projectField.addEventListener('keyup', () => {
    if(projectField.value == ""){
      submitBtn.style.display = "none";
      submitBtn.style.opacity = "0";
      submitBtn.style.transform = "translateX(60px)";
    } else {
      submitBtn.style.display = "inline-block";
      setTimeout(function(){
        submitBtn.style.opacity = "1";
        submitBtn.style.transform = "translateX(0px)";
      }, 100);
    }
  })
}

const resetSlidingBtn = () => {
  submitBtn.style.opacity = "0";
  submitBtn.style.transform = "translateX(60px)";
  setTimeout(function(){
    submitBtn.style.display = "none";
  }, 300);
}

const submitBtnListener = () => {
  submitBtn.addEventListener('click', () => {
    if(projectField.value != ""){
      let newProject = projectFactory(projectField.value);
      let currentStorage = retrieveStorage();
      currentStorage.push(newProject);
      updateStorage('projectArr', currentStorage);
      console.log(retrieveStorage());
      clearViewBoard();
      populateView(newProject);
      populateMenu(newProject);
      deleteProjectListener();
      projectViewListener();
    }
    projectField.value = "";
    resetSlidingBtn();
  })
    //
    // projectField.addEventListener('keyup', (event) => {
    //   if(event.keycode === 13){
    //     submitBtn.click();
    //   }
    //   if(projectField.value == ""){
    //     submitBtn.style.display = "none";
    //     submitBtn.style.opacity = "0";
    //     submitBtn.style.transform = "translateX(60px)";
    //   } else {
    //     submitBtn.style.display = "inline-block";
    //     setTimeout(function(){
    //       submitBtn.style.opacity = "1";
    //       submitBtn.style.transform = "translateX(0px)";
    //     }, 100);
    //   }
    // })
}

const deleteProjectListener = () => {
  let deleteBtnNodeList = document.querySelectorAll('.fa-times-circle');
  let newBtnListener = deleteBtnNodeList[deleteBtnNodeList.length - 1];
  newBtnListener.addEventListener("click", (event) => {
    let projectDate = event.target.parentElement.getAttribute('data-date');
    let projectName = event.target.parentElement.getAttribute('data-project');
    let parentElement = event.target.parentElement;
    setTimeout(() => {
      removeProjectAndBreak(parentElement);
    }, 1000)
    animateProjectDeletion(parentElement);
    let currentStorage = retrieveStorage();
    let clickedObj = projectLookup({name: projectName, date: projectDate}, currentStorage);
    removeProjectOrTask(currentStorage, clickedObj);
    updateStorage('projectArr', currentStorage);
    viewAfterProjectDeletion(document.querySelector('.viewer'));
  })
}

const allTasksListener = () => {
  let allTasks = document.querySelector('.all-tasks');
  allTasks.addEventListener('click', () => {
    clearViewBoard();
    let currentStorage = retrieveStorage();
    currentStorage.forEach((project) => {
      populateView(project);
      hideAddTaskBar();
    })

  })
}

const addImportance = () => {
  let flag = document.querySelectorAll('.flag-container');
  flag = flag[flag.length-1];
  flag.addEventListener("click", (event) => {
    let importanceColor = sortImportance(event.target.className);
    hideFlags(event.target, importanceColor);
    let singleTask = event.target.parentElement.parentElement;
    let taskDateId = singleTask.getAttribute('data-date');
    let projectDate = singleTask.parentElement.getAttribute('data-date');
    let projectName = singleTask.parentElement.getAttribute('data-project');
    let currentStorage = retrieveStorage();
    let foundProject = projectLookup({name: projectName, date: projectDate}, currentStorage);
    let foundTask = taskLookup(foundProject[0], taskDateId);
    if(foundTask[0].importance == importanceColor){
      foundTask[0].importance = undefined;
    } else {
      foundTask[0].importance = importanceColor;
    }
    updateStorage('projectArr', currentStorage);
  })
}


const addDescriptionListener = () => {
  let submitDescriptionBtn = document.querySelectorAll('.submit-description');
  console.log(submitDescriptionBtn);
  submitDescriptionBtn = submitDescriptionBtn[submitDescriptionBtn.length-1];
  submitDescriptionBtn.addEventListener("click", (event) => {
    let singleTask = event.target.parentElement.parentElement;
    let taskDateId = singleTask.getAttribute('data-date');
    let projectDate = singleTask.parentElement.getAttribute('data-date');
    let projectName = singleTask.parentElement.getAttribute('data-project');
    let currentStorage = retrieveStorage();
    let foundProject = projectLookup({name: projectName, date: projectDate}, currentStorage);
    let foundTask = taskLookup(foundProject[0], taskDateId);
    foundTask[0].description = submitDescriptionBtn.previousElementSibling.value;
    updateStorage('projectArr', currentStorage);
  })
}

const taskExpandListener = () => {
  if(document.querySelector('.single-task')){
    let newTask = document.querySelectorAll('.single-task');
    newTask = newTask[newTask.length - 1];
      newTask.addEventListener("click", (event) =>{
        if(event.target.className == 'task-name'){
          newTask.classList.toggle('reveal');
        }
      })
    }
}

const completedBtnListener = () => {
  if(document.querySelector('.circle')){
    let newCompleteBtn = document.querySelectorAll('.circle');
    newCompleteBtn = newCompleteBtn[newCompleteBtn.length-1];
    newCompleteBtn.addEventListener("click", (event) => {
      if(event.target.className == 'circle'){
        event.target.parentElement.classList.toggle('clicked');
        let nextNextSibling = event.target.nextSibling;
        let taskDateId = event.target.parentElement.getAttribute('data-date');
        let projectName = event.target.parentElement.parentElement.getAttribute('data-project');
        let projectDate = event.target.parentElement.parentElement.getAttribute('data-date');
        console.log(event.target.parentElement.parentElement);
        let currentStorage = retrieveStorage();
        let foundProject = projectLookup({name: projectName, date: projectDate}, currentStorage);
        let foundTask = taskLookup(foundProject[0], taskDateId);
        if(foundTask[0].isCompleted == false){
          foundTask[0].isCompleted = true;
          updateStorage('projectArr', currentStorage);
        } else {
          foundTask[0].isCompleted = false;
          updateStorage('projectArr', currentStorage);
        }
      }
    })
  }
}


const projectViewListener = () => {
  let newProject = document.querySelectorAll('.active-projects');
  newProject = newProject[newProject.length-1];
  newProject.addEventListener('click', (event) => {
    if(event.target.className == "text" || event.target.className == "fa-bookmark"){
      let project = projectLookup({name: event.target.parentNode.getAttribute('data-project'), date: event.target.parentNode.getAttribute('data-date')}, retrieveStorage());
      clearViewBoard();
      populateView(project[0]);
      revealAddTaskBar();
    }
  })
}

const deleteTaskListener = () => {
  let deleteTaskBtn = document.querySelectorAll('.delete-task-btn');
  deleteTaskBtn = deleteTaskBtn[deleteTaskBtn.length - 1];
  deleteTaskBtn.addEventListener('click', (event) => {
    let taskId = event.target.parentElement.parentElement.getAttribute('data-date');
    let projectName = event.target.parentElement.parentElement.parentElement.getAttribute('data-project');
    let projectDate = event.target.parentElement.parentElement.parentElement.getAttribute('data-date');
    let currentStorage = retrieveStorage();
    let project = projectLookup({name: projectName, date: projectDate}, currentStorage);
    console.log(project[0].tasks);
    let foundTask = taskLookup(project[0], taskId);
    removeProjectOrTask(project[0].tasks, foundTask);
    animateProjectDeletion(event.target.parentElement.parentElement);
    removeTask(event.target.parentElement.parentElement);
    updateStorage('projectArr', currentStorage);
  });
}


const newTaskListener = () => {
  //event listener for click on task submit btn
  taskSubmitBtn.addEventListener('click', () => {
    if(taskField.value != ""){
      let taskHeader = document.querySelector('.task-header');
      let projectName = taskHeader.getAttribute('data-project');
      let projectDate = taskHeader.getAttribute('data-date');
      let currentStorage = retrieveStorage();
      console.log(currentStorage);
      let project = projectLookup({name: projectName, date: projectDate}, currentStorage);
      project[0].tasks.push(taskFactory(taskField.value));
      updateStorage('projectArr', currentStorage);
      addTask(project[0].tasks[project[0].tasks.length-1], document.querySelector('.tasks'));
      taskExpandListener();
      deleteTaskListener();
      completedBtnListener();
      addDescriptionListener();
      addImportance();
      taskField.value = "";
    }
  })
  //event listener for keypress enter on text field
  taskField.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        taskSubmitBtn.click();
    }
  })
}



export {hamburgerListener, slidingBtnListener, newTaskListener, completedBtnListener, taskExpandListener, submitBtnListener, addDescriptionListener, deleteProjectListener, addImportance, deleteTaskListener, projectViewListener, allTasksListener}
