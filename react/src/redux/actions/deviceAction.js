import { GLOBALTYPES } from './globalTypes';
import { imageUpload, deletefile } from '../../utils/imageUpload';
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';
// import { createNotify, removeNotify } from './notifyAction';

export const DEVICE_TYPES = {
  CREATE_DEVICE: 'CREATE_DEVICE',
  LOADING_DEVICE: 'LOADING_DEVICE',
  GET_DEVICES: 'GET_DEVICES',
  UPDATE_DEVICE: 'UPDATE_DEVICE',
  GET_DEVICE: 'GET_DEVICE',
  DELETE_DEVICE: 'DELETE_DEVICE',
};

export const createDevice =
  ({ deviceData, auth }) =>
  async (dispatch) => {
    // let media = [];
    console.log("daaaaaaaaaaaaaataaaaaaaa", deviceData )
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      // if (images.length > 0) media = await imageUpload(images);

      const res = await postDataAPI(
        'devices',
        deviceData ,
        auth.token
      );

      dispatch({
        type: DEVICE_TYPES.CREATE_DEVICE,
        payload: res.data,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: 'Successfully created!' },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getDevices = (id,token) => async (dispatch) => {
  try {
    dispatch({ type: DEVICE_TYPES.LOADING_DEVICE, payload: true });
    const res = await getDataAPI(`get_devices/?id=${id}`, token);
    // const res = await getDataAPI(`get_devices`, token);
    console.log('get res.data', res.data);

    dispatch({
      type: DEVICE_TYPES.GET_DEVICES,
      payload: res.data,
    });

    dispatch({ type: DEVICE_TYPES.LOADING_DEVICE, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};


export const getdevice_byid = (id,token) => async (dispatch) => {

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true }});
    const res = await getDataAPI(`getdevice_byid/?id=${id}`, token);
    // const res = await getDataAPI(`get_devices`, token);
    console.log('get res.data', res.data);

    dispatch({
      type: DEVICE_TYPES.GET_DEVICES,
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

export const updateDevice =
  ({ id, deviceData, auth }) =>
  async (dispatch) => {

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `device/${id}`,
        deviceData,
        auth.token
      );
      console.log("update device",res.data)

      dispatch({ type: DEVICE_TYPES.UPDATE_DEVICE, payload:  res.data });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: 'Update Successfully!' },
      });



      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });
    }
  };

export const likeDevice =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newDevice = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: DEVICE_TYPES.UPDATE_DEVICE, payload: newDevice });

    socket.emit('likeDevice', newDevice);

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

export const unLikeDevice =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newDevice = {
      ...post,
      likes: post.likes.filter((like) => like.id !== auth.user.id),
    };
    dispatch({ type: DEVICE_TYPES.UPDATE_DEVICE, payload: newDevice });

    socket.emit('unLikeDevice', newDevice);

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

export const getDevice =
  ({ detailDevice, id, auth }) =>
  async (dispatch) => {
    if (detailDevice.every((post) => post.id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token);
        dispatch({ type: DEVICE_TYPES.GET_DEVICE, payload: res.data.post });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const deleteDevice =
  ( id, auth) =>
  async (dispatch) => {
    // dispatch({ type: DEVICE_TYPES.DELETE_DEVICE, payload: id });

    try {
      const res = await deleteDataAPI(`delete_device/${id}`, auth.token);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });

      dispatch({
        type: DEVICE_TYPES.DELETE_DEVICE,
        payload: id,
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
      
    } catch (err) {
      console.log(err)
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const saveDevice =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post.id] };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`saveDevice/${post.id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unSaveDevice =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post.id),
    };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`unSaveDevice/${post.id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
