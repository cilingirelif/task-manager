import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from "../actionTypes";

const initialState = {
    list: []   
  };

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      let lastTaskId = 0;
      if (state.list.length > 0)
        lastTaskId = state.list[state.list.length - 1].id;
      return {
        ...state,
        list: [...state.list, { ...action.payload, id: lastTaskId + 1 }]
      };
    }
    case UPDATE_TASK: {
      return {
        list: state.list.map(item => {
          if (item.id === action.payload.id) {
            item.status = action.payload.status;
            item.task = action.payload.task;
            return item;
          }
          return item;
        }),
       
      };
    }
    case DELETE_TASK: {
      return {
        list: state.list.filter(item => item.id !== action.payload.id)
      };
    }
    default: {
      return state;
    }
  }
};

export default tasks;
