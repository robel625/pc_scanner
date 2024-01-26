import { GLOBALTYPES } from './globalTypes';
import { imageUpload, deletefile } from '../../utils/imageUpload';
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  GET_POST: 'GET_POST',
  DELETE_POST: 'DELETE_POST',
};

export const createPost =
  ({ userData, auth }) =>
  async (dispatch) => {
    let media = [];
    console.log("employee", userData )
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      // if (images.length > 0) media = await imageUpload(images);

      const res = await postDataAPI(
        'posts',
        userData ,
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts = (id,token) => async (dispatch) => {
  try {
    dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
    const res = await getDataAPI(`get_posts/?id=${id}`, token);
    // const res = await getDataAPI(`get_posts`, token);
    console.log('get res.data employee', res.data);

    dispatch({
        type: GLOBALTYPES.employee, 
        payload: {
            user: res.data
        } 
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    )
      return;

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

      const res = await patchDataAPI(
        `post/${status.id}`,
        {
          content,
          images: [...imgOldUrl, ...media],
        },
        auth.token
      );

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
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
  ({ post, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

    try {
      const res = await deleteDataAPI(`post/${post.id}`, auth.token);

      console.log('post.images', post.images);
      await deletefile(post.images);
      // Notify
      // const msg = {
      //   id: post.id,
      //   text: 'added a new post.',
      //   recipients: res.data.newPost.user.followers,
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
