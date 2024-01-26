import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, postloginAPI, patchDataAPI } from '../../utils/fetchData'
import valid from '../../utils/valid'
import Cookies from 'universal-cookie';
import axios from 'axios'
import {BASE_URL}  from '../../utils/config'


export const login = (data) => async (dispatch) => {
    // const cookies = new Cookies(null, { path: '/' });
    const cookies = new Cookies();
    console.log("dtat", data)
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        const res = await postloginAPI('token/', data)
        console.log("resssssssssssss", res.data)
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access,
                refresh: res.data.refresh,
                user: res.data.user,
            } 
        })

        // cookies.set("myCat", "cat");
        // console.log(cookies.get('myCat')); // Pacman

        //  cookies.set("refreshToken", res.data.refresh_token, '/api/refresh_token')
        //  cookies.set('refreshtoken', res.data.refresh_token, {
        //     httpOnly: true,
        //     path: '/api/refresh_token',
        //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        //   })

    //    document.cookie = `refreshToken=${res.data.refresh_token};path=/api/refresh_token;max-age=${30 * 24 * 60 * 60}`;
        
        localStorage.setItem("refresh", res.data.refresh)
        localStorage.setItem("access_token", res.data.access)
        localStorage.setItem("firstLogin", true)
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })
        
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}


export const refreshToken = () => async (dispatch) => {
    
    const firstLogin = localStorage.getItem("firstLogin")
    if(firstLogin){
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })

        try {
            const refresh = localStorage.getItem("refresh")
            console.log("post1",refresh )
            const res = await axios.post(`${BASE_URL }/api/token/refresh/`, {refresh})
            console.log("refresh", res.data)
            dispatch({ 
                type: GLOBALTYPES.AUTH, 
                payload: {
                    token: res.data.access,
                    user: res.data.user,
                } 
            })

            localStorage.setItem("access_token", res.data.access)

            dispatch({ type: GLOBALTYPES.ALERT, payload: {} })

        } catch (err) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: err.response.data
                } 
            })
        }
    }
}

export const register = (data) => async (dispatch) => {
    const check = valid(data)
    if(check.errLength > 0)
    return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})

    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await postloginAPI('user/register/', data)
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token,
                refresh: res.data.refresh_token,
                user: res.data.user
                
            } 
        })

        

        console.log("regster", res.data)
        localStorage.setItem("refresh", res.data.refresh_token)
        localStorage.setItem("firstLogin", true)

        window.location.href = "/"

        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}



export const updateUser =
  ({ userData, auth, id }) =>
  async (dispatch) => {

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `updateUser/${id}`,
        userData,
        auth.token
      );

    //   dispatch({ type: GLOBALTYPES.AUTH, payload: {user: res.data} });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data },
      });
    }
  };

  
  export const changepassword =
  ({ oldPassword, newPassword, auth}) =>
  async (dispatch) => {

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      const body= {oldPassword, newPassword}

      const res = await postDataAPI(
        `changepassword/`,
        body,
        auth.token
      );

      dispatch({ type: GLOBALTYPES.AUTH, payload: res.data.msg });

      localStorage.removeItem('firstLogin')
      localStorage.removeItem('refresh')
      localStorage.removeItem('access_token')

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        const refresh_token  = localStorage.getItem("refresh")
        localStorage.removeItem('refresh')
        localStorage.removeItem('access_token')
        // await postDataAPI('user/logout/blacklist/', {refresh_token })
        window.location.href = "/"
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}