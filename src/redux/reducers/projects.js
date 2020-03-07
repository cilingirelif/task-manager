

import { ADD_PROJECT } from "../actionTypes";

const initialState = {
  list: []   
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }
 
    default:
      return state;
  }
}
