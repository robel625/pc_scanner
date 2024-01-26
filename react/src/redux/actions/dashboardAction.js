import { GLOBALTYPES } from './globalTypes';
import { imageUpload, deletefile } from '../../utils/imageUpload';
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';
// import { createNotify, removeNotify } from './notifyAction';

export const DASHBOARD_TYPES = {
  GET_DASHBOARD: 'GET_DASHBOARD'
};



export const getDashboard = (startDate, endDate,token) => async (dispatch) => {

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true }});
    const res = await getDataAPI(`get_dashboard/?startDate=${startDate}&endDate=${endDate}`, token);
    // const res = await getDataAPI(`get_devices`, token);
    console.log('dashboard res.data', res.data);

    dispatch({
      type: DASHBOARD_TYPES.GET_DASHBOARD,
      payload: res.data
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }

};
