import { ADD_PROJECT} from "./actionTypes";

let nextTodoId = 0;

export const addProject = content => ({
  type: ADD_PROJECT,
  payload: {
    id: ++nextTodoId,
    content
  }
});


