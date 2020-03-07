
import { ADD_TASK } from "../actionTypes";

const initialState = {
    list: []   
  };

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }
    default: {
      return state;
    }
  }
};

export default tasks;
