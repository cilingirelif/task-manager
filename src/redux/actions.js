import { ADD_PROJECT, ADD_TASK, UPDATE_TASK, DELETE_TASK } from "./actionTypes";

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

export const updateTask = content => ({
  type: UPDATE_TASK,
  payload: {
    id: content.id,
    status: content.status,
    task: content.task
  }
});

export const deleteTask = content => {
  return {
    type: DELETE_TASK,
    payload: {
      id: content.id
    }
  };
};

