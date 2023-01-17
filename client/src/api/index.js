import axios from 'axios';
import drunkImg from '../image/drunk.webp';
import hopeImg from '../image/hope.webp';
import goodImg from '../image/good.webp';

export const loginApi = async (username, password, chinese, cb) => {
    try {
        const loginResponse = await axios.post('/api/login', { username, password, chinese });
        let msg = loginResponse.data.message;
        // console.log(msg);
        let obj;
        if (msg === '用户不存在' || msg === 'User does not exist') {
            obj = {
                image: drunkImg,
                spinner: false
            }
            cb(false)
        }
        if (msg === '密码错误' || msg === 'Incorrect password') {
            obj = {
                image: hopeImg,
                spinner: false
            }
            cb(false)
        }
        if (msg === '密码正确' || msg === 'Password is correct') {
            obj = {
                image: goodImg,
                spinner: false
            }

            cb(true)
        }


        return { ...loginResponse.data, ...obj };

    } catch (err) {
        let errMessage = {
            page: 'api/index.js',
            message: 'loginApi error',
            errors_message: err
        }

        console.log(errMessage);
    }
}

// 捕捉cookies 送去后端 检查登录状况。
export const checkLogin = async (cb) => {

    // console.log('checkLogin')
    try {

        const checkToken = await axios.get('/api/login');

        if (checkToken.data.login) {
            cb('/record');
            return {
                login: checkToken.data.login,
                role: checkToken.data.role
            }
        } else {
            cb('/');
            return {
                login: false,
                role: null
            }
        }


    } catch (err) {
        let errMsg = {
            page: 'api/index.js',
            message: 'api checkLogin errors',
            errors_message: err
        }

        console.log(errMsg);

        return {
            login: false,
            role: ''
        }

    }


}

// 储存物流记录
export const saveDeliveryData = async (shipmentData) => {
    try {
        const saveDataResponse = await axios.post('/api/delivery', { data: shipmentData });

        // console.log(saveDataResponse.data);

    } catch (err) {
        const errMessage = {
            page: 'api/index.js',
            message: '储存物流记录 saveDeliveryData 发生错误',
            errors_message: err
        }
        console.log(errMessage);
    }
}

// 取出全部物流记录。
export const exportAllDeliveryData = async () => {
    try {
        const getAllDeliveryData = await axios.get('/api/delivery');
        // console.log(getAllDeliveryData.data)

        return getAllDeliveryData.data;

    } catch (err) {
        const errMessage = {
            page: 'api/index.js',
            message: '举出全部物流记录失败',
            errors_message: err
        }
        console.log(errMessage);
    }
}

// 删除物流记录。
export const deleteDeliveryData = async (id) => {
    try {
        const deleteData = await axios.delete('/api/delivery', { data: { id } });
        // console.log(deleteData.data)

    } catch (err) {
        const errMessage = {
            page: 'api/index.js',
            message: '删除物流记录发生错误。',
            errors_message: err
        }

        console.log(errMessage);
    }
}

// 编辑所选的 物流记录 并且储存
export const saveEditData = async (data) => {
    try {



        let dataArr = Object.entries(data);
        let filtered = dataArr.filter(([key, value]) => value !== '');
        let dataObj = Object.fromEntries(filtered);
        // console.log(dataObj)

        const editData = await axios.patch('/api/delivery', { ...dataObj });

        // console.log(editData.data);

    } catch (err) {
        const errMessage = {
            page: 'api/index.js',
            message: '编辑所选的 物流记录 并且储存 出现错误',
            errors_message: err
        }

        console.log(errMessage);
    }
}