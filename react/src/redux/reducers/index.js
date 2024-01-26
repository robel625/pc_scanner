import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import socket from './socketReducer';
import homePosts from './postReducer';
import employee from './employeeReducer';
import check from './checkReducer';
import device from './deviceReducer';
import dashboard from './dashBoardReducer';


export default combineReducers({
  auth,
  alert,
  socket,
  homePosts,
  employee,
  device,
  check,
  dashboard,
});
