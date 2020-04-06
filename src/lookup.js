function projectLookup(queryObj, arr){
  let clickedProject = arr.filter((obj) => {
    return queryObj.name == obj.name && queryObj.date == obj.date;
  })
  return clickedProject;
}

function taskLookup(project, dateId){
  let foundTask = project.tasks.filter((obj) => {
    return dateId == obj.date;
  })
  return foundTask;
}



export  {projectLookup, taskLookup}
