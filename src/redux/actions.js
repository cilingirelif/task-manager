import { ADD_PROJECT} from "./actionTypes";
import { ADD_TASK} from "./actionTypes";
import { UPDATE_TASK_STATUS} from "./actionTypes";

let nextProjectId = 0;
let nextTaskId = 0;

export const addProject = content => ({
  type: ADD_PROJECT,
  payload: {
    id: ++nextProjectId,
    name: content.projectName,
    description : content.description
  }
})
 
export const addTask = content => ({
  type: ADD_TASK,
  payload: {
    id: ++nextTaskId,
    task : content.task,
    projectId : content.projectId,
    projectName : content.projectName,
    status:"Todo"
  }
});

export const updateTaskStatus = content => ({
  type: UPDATE_TASK_STATUS,
  payload: {
    id: content.id,
    status:content.status
  }
});


