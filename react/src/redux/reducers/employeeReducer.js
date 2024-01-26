import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = {}

const employeeReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.employee:
            return action.payload;
        default:
            return state;
    }
}


export default employeeReducer
