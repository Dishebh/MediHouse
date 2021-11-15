import axios from 'axios';
import { setAuthtoken } from '../utils/setAuthToken';
import {
  UPDATE_USER,
  LOGOUT,
  FETCH_USER,
  REGISTER_USER,
  LOGIN_USER,
  USER_LIST,
  ADD_MEDICATION
} from './types';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/current_user');

    console.log('fetchuser', res.data);

    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const registerUser =
  (name, email, profilePic, password) => async (dispatch) => {
    try {
      const res = await axios.post('/auth/signup', {
        name,
        email,
        profilePic,
        password
      });

      setAuthtoken(res.data.data.token);

      dispatch({
        type: REGISTER_USER,
        payload: res.data.data.user
      });
    } catch (error) {
      console.error(error);
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login', {
      email,
      password
    });

    setAuthtoken(res.data.data.token);

    dispatch({
      type: LOGIN_USER,
      payload: res.data.data.user
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  await axios.get('/auth/logout');

  dispatch({
    type: LOGOUT
  });
};

export const updateUser =
  (name, email, phoneNo, profilePic) => async (dispatch) => {
    await axios.patch('/auth/update-user', {
      name,
      email,
      phoneNo,
      profilePic
    });

    dispatch({
      type: UPDATE_USER,
      payload: { name, email, phoneNo, profilePic }
    });
  };

export const fetchUserList = () => async (dispatch) => {
  const res = await axios.get('/api/medications');

  dispatch({
    type: USER_LIST,
    payload: res.data
  });
};

export const addMedication =
  (firstName, lastName, email, address, phone, avatarUrl, cronValue) =>
  async (dispatch) => {
    const res = await axios.post('/api/medication', {
      firstName,
      lastName,
      email,
      address,
      phone,
      avatarUrl,
      cronValue
    });

    dispatch({
      type: ADD_MEDICATION,
      payload: res.data
    });
  };
