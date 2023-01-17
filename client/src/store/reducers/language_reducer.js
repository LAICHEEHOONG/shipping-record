import {
    PICK_LANGUAGE,

} from '../types';

const defaultState = {
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
    chinese: true
};
export default function languageReducer(state = defaultState, action) {
    switch (action.type) {
        case PICK_LANGUAGE:
            return { ...state, ...action.payload }
    
  

        default:
            return state;
    }
}