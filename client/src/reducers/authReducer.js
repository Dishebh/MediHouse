import {
  FETCH_USER,
  FETCH_ERROR,
  LOGOUT,
  REGISTER_USER,
  LOGIN_USER,
  UPDATE_USER
} from '../actions/types';

const initialState = {
  user: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload
      };
    case FETCH_ERROR:
      return state;
    case LOGIN_USER:
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
