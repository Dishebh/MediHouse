import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { medicationReducer } from './medicationReducer';

export default combineReducers({
  auth: authReducer,
  medication: medicationReducer
});
