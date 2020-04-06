const projectFactory = (name) => {
  let tasks = [];
  let _name = name;
  let date = Date.now()
  return{
        tasks, date,
        get name(){
            return _name;
        },

        set name(name){
            _name = name;
        }
    }
}

const taskFactory = (name) => {
  let _isCompleted = false;
  let _name = name;
  let _description = 'enter a description';
  let _importance = undefined;
  let date = Date.now();
  return{
     date,
    get name(){
        return _name;
    },

    set name(name){
        _name = name;
    },
    get description(){
        return _description;
    },

    set description(description){
        _description = description;
    },

    get isCompleted(){
      return _isCompleted;
    },

    set isCompleted(boolean){
      _isCompleted = boolean;
    },

    get importance(){
      return _importance;
    },

    set importance(importance){
      _importance = importance;
    }
  }
}

export {projectFactory, taskFactory}
