import { DEVICE_TYPES } from '../actions/deviceAction'
import { EditData, DeleteData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    devices: '',
}

const devicesReducer = (state = initialState, action) => {
    switch (action.type){
        // case DEVICE_TYPES.CREATE_DEVICE:
        //     return {
        //         ...state,
        //         devices: action.payload
        //     };
        case DEVICE_TYPES.LOADING_DEVICE:
            return {
                ...state,
                loading: action.payload
            };
        case DEVICE_TYPES.GET_DEVICES:
            return {
                ...state,
                // devices: action.payload.devices,
                // result: action.payload.result,
                // page: action.payload.page
                
                devices: action.payload,
            };
        // case DEVICE_TYPES.UPDATE_DEVICE:
        //     return {
        //         ...state,
        //         devices: EditData(state.devices, action.payload.id, action.payload)
        //     };
        // case DEVICE_TYPES.DELETE_DEVICE:
        //     return {
        //         ...state,
        //         devices: DeleteData(state.devices, action.payload.id)
        //     };
        default:
            return state;
    }
}

export default devicesReducer