import {
    SELECTED_DATA
} from '../types';

const defaultState = {
    ship_to: 111,
    carton_: 111,
    cn_: 111,
    courier_: 111,
    do_: 111,
    remark_: 111,
    weight_: 111,
    wxr_: 111
};

export default function selectedDataReducer(state = defaultState, action) {
    switch (action.type) {

        case SELECTED_DATA:
            return { ...state, ...action.payload }



        default:
            return state;
    }
}