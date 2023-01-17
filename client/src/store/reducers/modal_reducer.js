import {
    SET_MODAL,
    SET_POP_MODAL,
    SET_EDIT_MODAL
} from '../types';

const defaultState = {
    set_modal: false,
    set_pop_modal: false,
    set_edit_modal: false,
    id: null
};
export default function modalReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MODAL:
            return { ...state, set_pop_modal: false, set_edit_modal: false,id: null,set_modal: action.payload }
        case SET_POP_MODAL:
            return { ...state, set_modal: false, set_edit_modal: false, set_pop_modal: action.payload.popUp, id: action.payload.id }
        case SET_EDIT_MODAL:
            return { ...state, set_modal: false, set_edit_modal: action.payload.popUp, set_pop_modal: false, id: action.payload.id }

        default:
            return state;
    }
}