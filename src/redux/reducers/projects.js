

import { ADD_PROJECT } from "../actionTypes";

const initialState = {
  list: []   
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT: {
      let lastProjectId = 0;
      if (state.list.length > 0)
        lastProjectId = state.list[state.list.length - 1].id;
      return {
        ...state,
        list: [...state.list, { ...action.payload, id: lastProjectId + 1 }]
      };
    }
 
    default:
      return state;
  }
}
