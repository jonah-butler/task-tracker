import {hamburgerListener, slidingBtnListener, submitBtnListener, newTaskListener, completedBtnListener, allTasksListener} from './events'
import {loadStorage} from './session_storage'

loadStorage();
hamburgerListener();
allTasksListener();
slidingBtnListener();
submitBtnListener();
completedBtnListener();
newTaskListener();

//ADD GETTERS AND SETTERS TO PROJECT FACTORY FUNCTION
