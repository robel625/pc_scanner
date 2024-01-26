import { GLOBALTYPES } from './globalTypes';
import { imageUpload, deletefile } from '../../utils/imageUpload';
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';
// import { createNotify, removeNotify } from './notifyAction';

export const CHECK_TYPES = {
  CREATE_CHECK: 'CREATE_CHECK',
  LOADING_CHECK: 'LOADING_CHECK',
  GET_CHECKS: 'GET_CHECKS',
  UPDATE_CHECK: 'UPDATE_CHECK',
  GET_CHECK: 'GET_CHECK',
  GET_CHECKLIST: 'GET_CHECKLIST',
  DELETE_CHECK: 'DELETE_CHECK',
  GET_SCANNED: 'GET_SCANNED',
  CREATE_CHECKLIST: 'CREATE_CHECKLIST',
};


export const getall_byid = (id,token) => async (dispatch) => {

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true }});
    const res = await getDataAPI(`getall_byid/?id=${id}`, token);
    // const res = await getDataAPI(`get_devices`, token);
    console.log('get res.data', res.data);

    dispatch({
      type: CHECK_TYPES.GET_CHECKS,
      payload: { employee: res.data.employee,
                 device: res.data.device,
                 check: res.data.check,
                 last_CheckIn: res.data.Last_CheckIn,
                 last_CheckOut: res.data.Last_CheckIn,
                }
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }

};

export const createCheck =
  ({ checkData, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      // if (images.length > 0) media = await imageUpload(images);

      const res = await postDataAPI(
        'create_check',
        checkData ,
        auth.token
      );

      dispatch({
        type: CHECK_TYPES.CREATE_CHECKLIST,
        payload: res.data,
      });

    console.log('CREATE_CHECK', res.data )

      dispatch({
        type: CHECK_TYPES.CREATE_CHECK,
        payload: res.data ,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: 'Successfully Checked!' },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getChecks = (barcode,token) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await getDataAPI(`get_check/?barcode=${barcode}`, token);
    // const res = await getDataAPI(`get_check`, token);
    console.log('get res.data', res.data);

    // dispatch({
    //   type: GLOBALTYPES.check,
    //   payload: res.data,
    // });

    dispatch({
        type: CHECK_TYPES.GET_SCANNED,
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

export const getCheckList = (selectedDate, token) => async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI(`get_checklist/?date=${selectedDate}`, token);
      // const res = await getDataAPI(`get_check`, token);
      console.log('get res.data', res.data);
  
      // dispatch({
      //   type: GLOBALTYPES.check,
      //   payload: res.data,
      // });
  
      dispatch({
          type: CHECK_TYPES.GET_CHECKLIST,
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

export const updateCheck =
  ({ id, deviceData, auth }) =>
  async (dispatch) => {

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `device/${id}`,
        deviceData,
        auth.token
      );

      dispatch({ type: CHECK_TYPES.UPDATE_CHECK, payload: res.data });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likeCheck =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newCheck = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: CHECK_TYPES.UPDATE_CHECK, payload: newCheck });

    socket.emit('likeCheck', newCheck);

    try {
      await patchDataAPI(`post/${post.id}/like`, null, auth.token);

      // Notify
      // const msg = {
      //   id: auth.user.id,
      //   text: 'like your post.',
      //   recipients: [post.user.id],
      //   url: `/post/${post.id}`,
      //   content: post.content,
      //   image: post.images[0].url,
      // };

      // dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikeCheck =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newCheck = {
      ...post,
      likes: post.likes.filter((like) => like.id !== auth.user.id),
    };
    dispatch({ type: CHECK_TYPES.UPDATE_CHECK, payload: newCheck });

    socket.emit('unLikeCheck', newCheck);

    try {
      await patchDataAPI(`post/${post.id}/unlike`, null, auth.token);

      // Notify
      // const msg = {
      //   id: auth.user.id,
      //   text: 'like your post.',
      //   recipients: [post.user.id],
      //   url: `/post/${post.id}`,
      // };
      // dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getCheck =
  ({ detailCheck, id, auth }) =>
  async (dispatch) => {
    if (detailCheck.every((post) => post.id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token);
        dispatch({ type: CHECK_TYPES.GET_CHECK, payload: res.data.post });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const deleteCheck =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: CHECK_TYPES.DELETE_CHECK, payload: post });

    try {
      const res = await deleteDataAPI(`post/${post.id}`, auth.token);

      console.log('post.images', post.images);
      await deletefile(post.images);
      // Notify
      // const msg = {
      //   id: post.id,
      //   text: 'added a new post.',
      //   recipients: res.data.newCheck.user.followers,
      //   url: `/post/${post.id}`,
      // };
      // dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const saveCheck =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post.id] };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`saveCheck/${post.id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unSaveCheck =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post.id),
    };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`unSaveCheck/${post.id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
