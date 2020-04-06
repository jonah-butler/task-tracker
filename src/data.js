import {retrieveStorage} from './session_storage'

let projectArr = () => {
  let x = retrieveStorage('projectArr');
  return x;
}

export default projectArr;
