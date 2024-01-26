import { DASHBOARD_TYPES } from '../actions/dashboardAction'
import { EditData, DeleteData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    dashboard: [],
}

const checkReducer = (state = initialState, action) => {
    switch (action.type){
        case DASHBOARD_TYPES.GET_DASHBOARD:
            return {
                ...state,                
                dashboard: action.payload,
            };
            
        default:
            return state;
    }
}

export default checkReducer