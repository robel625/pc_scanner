import { GLOBALTYPES } from './globalTypes';
import { imageUpload, deletefile } from '../../utils/imageUpload';
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';
import { CHECK_TYPES } from './checkAction'
// import { createNotify, removeNotify } from './notifyAction';

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  GET_POST: 'GET_POST',
  DELETE_POST: 'DELETE_POST',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE'
};

export const createPost =
  ({ userData, auth }) =>
  async (dispatch) => {
    let media = [];
    console.log("daaaaaaaaaaaaaataaaaaaaa", userData )
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      // if (images.length > 0) media = await imageUpload(images);

      const res = await postDataAPI(
        'posts',
        userData ,
        auth.token
      );

      console.log("create post retutn server", res.data )
      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload:  res.data ,
        
      });
       
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: 'Successfully created!' },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      // Notify
      // const msg = {
      //   id: res.data.newPost.id,
      //   text: 'added a new post.',
      //   recipients: res.data.newPost.user.followers,
      //   url: `/post/${res.data.newPost.id}`,
      //   content,
      //   image: media[0].url,
      // };

      // dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts = (page,pageSize,token, staff=1) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getDataAPI(`get_posts/?staff=${staff}&page=${page}&pageSize=${pageSize}`, token);
    // const res = await getDataAPI(`get_posts`, token);
    console.log('get res.data', res.data);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: 2 },
    });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updatePost =
  ({ id, userData, auth, status }) =>
  async (dispatch) => {

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `post/${id}`,
        userData,
        auth.token
      );

      console.log("post update", res.data)

      dispatch({ type: POST_TYPES.UPDATE_EMPLOYEE, payload: { employee: res.data}  });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success:  "Successfully Updated"  } });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };


  
  export const filterPosts = (query,token, staff=1) => async (dispatch) => {
    try {
      dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
      const res = await getDataAPI(`employee/filter/?query=${query}&staff=${staff}`, token);
      // const res = await getDataAPI(`get_posts`, token);
      console.log('query res.data  ', res.data);
  
      dispatch({
        type: POST_TYPES.GET_POSTS,
        payload: { ...res.data, page: 2 },
      });
  
      dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };











export const likePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit('likePost', newPost);

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

export const unLikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like.id !== auth.user.id),
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit('unLikePost', newPost);

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

export const getPost =
  ({ detailPost, id, auth }) =>
  async (dispatch) => {
    if (detailPost.every((post) => post.id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token);
        dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const deletePost =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: id });

    try {
      const res = await deleteDataAPI(`delete_employee/${id}`, auth.token);

       dispatch({
        type: POST_TYPES.DELETE_POST,
        payload: id,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const savePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post.id] };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`savePost/${post.id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unSavePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post.id),
    };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`unSavePost/${post.id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
