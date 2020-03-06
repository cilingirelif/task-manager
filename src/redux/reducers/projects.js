

import { ADD_PROJECT } from "../actionTypes";

const initialState = {
  projects: []   
};

export default function(state = initialState, action) {
  //console.log(action)
  switch (action.type) {
    case ADD_PROJECT: {
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    }
 
    default:
      return state;
  }
}
