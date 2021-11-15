import { ADD_MEDICATION, USER_LIST } from '../actions/types';

const initialState = {
  userList: null
};

export const medicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        userList: action.payload
      };
    case ADD_MEDICATION:
      return {
        ...state,
        userList: [action.payload, ...state.userList]
      };
    default:
      return state;
  }
};
