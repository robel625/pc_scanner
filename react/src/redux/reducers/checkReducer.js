import { CHECK_TYPES } from '../actions/checkAction'
import { POST_TYPES } from '../actions/postAction'
import { DEVICE_TYPES } from '../actions/deviceAction'
import { SCAN_TYPES } from '../../SocketClient'
import { EditData, DeleteData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    checkList: [],
    check: '',
    // byid: '',
    current_check: '',
    scan: "",

    employee: '',
    device: [],
    check: [],
    last_CheckIn:'',
    last_CheckOut: '',
}

const checkReducer = (state = initialState, action) => {
    switch (action.type){
        case CHECK_TYPES.CREATE_CHECK:
            return {
                ...state,
                current_check: action.payload
            };
        case CHECK_TYPES.LOADING_CHECK:
            return {
                ...state,
                loading: action.payload
            };
        case CHECK_TYPES.GET_CHECKS:
            return {
                ...state, 
             employee: action.payload.employee,
             device: action.payload.device,
             check: action.payload.check,
             last_CheckIn: action.payload.last_CheckIn,
             last_CheckOut: action.payload.last_CheckIn,
            };
            
        case CHECK_TYPES.GET_SCANNED:
            return {
                    ...state,                
                    scan: action.payload,
                };

        case CHECK_TYPES.GET_CHECKLIST:
            return {
                ...state,                
                checkList: action.payload,
            };
        case CHECK_TYPES.CREATE_CHECKLIST:
            return {
                ...state,                
                checkList: [action.payload, ...state.checkList],
            };
            
        case CHECK_TYPES.UPDATE_CHECK:
            return {
                ...state,
                check: EditData(state.check, action.payload.id, action.payload)
            };
        case CHECK_TYPES.DELETE_CHECK:
            return {
                ...state,
                check: DeleteData(state.check, action.payload.id)
            };

        
        case SCAN_TYPES.KNOW_SCANNED:
            return {
                ...state,                
                scan: action.payload,
            };

        case POST_TYPES.UPDATE_EMPLOYEE:
            return {
                ...state,                
                employee: action.payload.employee,
            };
        case DEVICE_TYPES.CREATE_DEVICE:
            return {
                ...state,
                device: [action.payload, ...state.device]
            };
        case DEVICE_TYPES.UPDATE_DEVICE:
            return {
                ...state,
                device: EditData(state.device, action.payload.id, action.payload)
            };
        case DEVICE_TYPES.DELETE_DEVICE:
            return {
                ...state,
                device: DeleteData(state.device, action.payload)
            };
        default:
            return state;
    }
}

export default checkReducer