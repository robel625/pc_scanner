import { POST_TYPES } from '../actions/postAction'
import { EditData, DeleteData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    posts: [],
    result: 0,
    page: 2
}

const postReducer = (state = initialState, action) => {
    switch (action.type){
        case POST_TYPES.CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case POST_TYPES.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            };
        case POST_TYPES.GET_POSTS:
            console.log("reducerrr",action.payload)
            return {
                ...state,
                // posts: action.payload.posts,
                // result: action.payload.result,
                // page: action.payload.page
                
                posts: action.payload.results,
            };
        case POST_TYPES.UPDATE_POST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload.id, action.payload)
            };
        case POST_TYPES.DELETE_POST:
            return {
                ...state,
                posts: DeleteData(state.posts, action.payload)
            };
        default:
            return state;
    }
}

export default postReducer