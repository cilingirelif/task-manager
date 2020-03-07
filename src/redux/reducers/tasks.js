
import { ADD_TASK } from "../actionTypes";
import { UPDATE_TASK_STATUS} from "../actionTypes";

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
    case UPDATE_TASK_STATUS: {
      return {
        list: state.list.map(item => {
          if (item.id === action.payload.id) {
            item.status = action.payload.status;
            return item;
          }
          return item;
        }),
       
      };
    }
    default: {
      return state;
    }
  }
};

export default tasks;
