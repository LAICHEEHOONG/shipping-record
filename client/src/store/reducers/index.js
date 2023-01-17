import {combineReducers} from 'redux';
import language from './language_reducer';
import login from './login_reducer';
import modal from './modal_reducer';
import deliveryData from './deliver_data_reducer';
import selectedData from './selected_data';

const appReducers = combineReducers({
    language,
    login,
    modal,
    deliveryData,
    selectedData
});

export default appReducers;

