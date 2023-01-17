import { 
    LOGIN_ACTION,
    RESET_LOGIN_TITLE,
    ON_SPINNER,
    LOGOUT,
    CHECK_LOGIN
 } from '../types';

import happinessImg from '../../image/happiness.webp';

const defaultState = {
    login: false,
    role: null,
    message: null,
    image: happinessImg,
    spinner: false
};

export default function loginReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_ACTION:
            return {...state, ...action.payload}
        case RESET_LOGIN_TITLE: 
            return {...state, message: action.payload, image: happinessImg}
        case ON_SPINNER: 
            return {...state, spinner: true} //...action.payload = {image: xx, spinner: true / false}
        case LOGOUT: 
            return {...state, login: false}
        case CHECK_LOGIN:
            return {...state, ...action.payload}//action.payload = {login: boolean, role: ''}

        default:
            return state;
    }
}