import * as api from '../../api';
import {
    PICK_LANGUAGE,
    LOGIN_ACTION,
    RESET_LOGIN_TITLE,
    ON_SPINNER,
    LOGOUT,
    CHECK_LOGIN,
    SET_MODAL,
    SET_POP_MODAL,
    SET_EDIT_MODAL,
    IMPORT_DELIVERY_DATA,
    SELECTED_DATA
} from '../types';


// 选择语言
export const pickLanguage = (bool) => {

    let state;

    if (bool) {
        state = {
            control: {
                title: '寄货记录',
                add: '增加',
                choosenLanguage: 'English',
                logout: '登出',
                passwordLogin: '密码登入',
                loginText: '登入',
                passwordPlaceholder: '密码',
                usernamePlaceholder: '帐号',
                no: '序号',
                shipTo: '运送到',
                courier: '物流',
                cn: '托运单号',
                carton: '箱',
                weight: '重量/公斤',
                deliveryOrder: '交货单',
                wxr: '保修单',
                date: '日期',
                remark: '备注',
                shippingForm: '创建运输表格',
                closeBtn: '关闭',
                saveBtn: '储存',
                shipToErr1: '运送地点必须填写',
                shipToErr2: '运送地点名字太长',
                courierErr1: '必须填写物流单位',
                courierErr2: '物流信息太长',
                cnErr1: '托运单号太长',
                cartonErr1: '纸箱数量太多了吧',
                cartonErr2: '纸箱数量不能少于零',
                weightErr1: '此重量异常',
                weightErr2: '重量不能为负数',
                popTitle: '编辑与删除',
                editBtn: '编辑',
                deleteBtn: '删除',
                by: '通过',
                guestEdit: '访客不允许编辑物流项目',
                guestDelete: '访客不允许删除物流项目',
                filter: '搜寻'
            },
            chinese: bool
        };
    } else {
        state = {
            control: {
                title: 'Shipping Record',
                add: 'Add',
                choosenLanguage: '中文',
                logout: 'Logout',
                passwordLogin: 'Password login',
                loginText: 'Login',
                passwordPlaceholder: 'Password',
                usernamePlaceholder: 'Username',
                no: 'No.',
                shipTo: 'SHIP TO',
                courier: 'COURIER',
                cn: 'C.N',
                carton: 'CARTON',
                weight: 'WEIGHT / kg',
                deliveryOrder: 'D.O',
                wxr: 'WXR',
                date: 'DATE',
                remark: 'REMARK',
                shippingForm: 'CREATE SHIPPING FORM',
                closeBtn: 'Close',
                saveBtn: 'Save',
                shipToErr1: 'Shipping location is required',
                shipToErr2: 'The shipping location name is too long',
                courierErr1: 'Logistics information must be filled in',
                courierErr2: 'Logistics information is too long',
                cnErr1: 'Consignment number too long',
                cartonErr1: 'Too many cartons',
                cartonErr2: 'The number of cartons cannot be less than zero',
                weightErr1: 'This weight is abnormal',
                weightErr2: 'Weight cannot be negative',
                popTitle: 'Edit And Delete',
                editBtn: 'Edit',
                deleteBtn: 'Delete',
                by: 'BY',
                guestEdit: 'Visitors are not allowed to edit logistics items',
                guestDelete: 'Visitors are not allowed to delete logistics items',
                filter: 'Filter'

            },
            chinese: bool
        };
    }

    return {
        type: PICK_LANGUAGE,
        payload: state
    }
}

// 登入
export const loginAction = (username, password, chinese, cb) => ({
    type: LOGIN_ACTION,
    payload: api.loginApi(username, password, chinese, cb)
})

//  初始化登录标题
export const resetLoginTitle = (title) => ({
    type: RESET_LOGIN_TITLE,
    payload: null
})

// 控制spinner 
export const onSpinner = (img, bool) => ({
    type: ON_SPINNER,
    payload: null
})

// 设定login: false
export const setLogout = () => ({
    type: LOGOUT,
    payload: null
})


// 检查登录
export const checkLogin = (cb) => ({
    type: CHECK_LOGIN,
    payload: api.checkLogin(cb)
})

// 启动 ADD MODAL
export const setModal = (bool) => ({
    type: SET_MODAL,
    payload: bool
})

// 启动 POP MODAL
export const setPopModal = (bool, id) => ({
    type: SET_POP_MODAL,
    payload: {popUp: bool, id}
})

// 启动 EDIT MODAL
export const setEditModal = (bool, id) => ({
    type: SET_EDIT_MODAL,
    payload: {popUp: bool, id}
})

// 取出物流全部数据。
export const importAllDeliveryData = () => ({
    type: IMPORT_DELIVERY_DATA,
    payload: api.exportAllDeliveryData()
})

// 输入被选中的数据。
export const selectData = (data) => ({
    type: SELECTED_DATA,
    payload: data
})