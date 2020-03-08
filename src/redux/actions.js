import { ADD_PROJECT} from "./actionTypes";
import { ADD_TASK} from "./actionTypes";
import { UPDATE_TASK_STATUS} from "./actionTypes";

export const addProject = content => ({
  type: ADD_PROJECT,
  payload: {
    name: content.projectName,
    description : content.description
  }
})
 
export const addTask = content => ({
  type: ADD_TASK,
  payload: {
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


