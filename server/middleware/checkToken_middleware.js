
const jwt = require('jsonwebtoken');
const jwtSecret = 'iWantAppleWatch';
const { Password } = require('../models/password_model');

// 只能检查token 是否存在
exports.checkToken = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            res.json({message: 'token not found', login: false});
            // next()
        } else {
            const decoded = jwt.verify(token, jwtSecret);// 如果这里出现问题就会跳去catch(err)那边。 
            next();   
        }

      

    } catch(err) {
        let errorMessages = {
            page: 'checkToken_middleware.js',
            message: 'check token error',
            errors_message: err,
            login: false
        }
        res.json(errorMessages);
    }
}

// 可以检查用户身份。
exports.checkUser = async(token) => {
    try {
        const id = jwt.verify(token, jwtSecret);
        const user = await Password.findOne({_id: id});
        
        return user;
       
    } catch(err) {
        let errorsMessages = {
            page: 'checkToken_middleware.js',
            message: 'checkUser errors',
            error_message: err,
            login: false
        }
        console.log(errorsMessages);
        return errorsMessages;
    }
   
}


// 如果有检测到login:false, 让页面自动登出。
