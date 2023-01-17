import {
    IMPORT_DELIVERY_DATA
} from '../types';

const defaultState = {
    data: []
};
export default function deliveryDataReducer(state = defaultState, action) {
    switch (action.type) {

        case IMPORT_DELIVERY_DATA:
            return {...state, data: action.payload}
    
  

        default:
            return state;
    }
}