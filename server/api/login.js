const express = require('express');
let router = express.Router();
const { Password } = require('../models/password_model');
const {checkToken, checkUser} = require('../middleware/checkToken_middleware');





router.route('/')
    .post(async (req, res) => {

        // 登入
        try {
            const username = req.body.username;
            const password = req.body.password;
            const chinese = req.body.chinese;
            let title = '';

            let dbPassword = await Password.findOne({username});//array[_id, password]
            console.log(dbPassword);

            if(dbPassword === null) {
                if(chinese) {
                    title = '用户不存在';
                } else {
                    title = 'User does not exist'
                }
                res.json({message: title, login: false, role: null});
            } else {
                dbPassword.comparePassword(password, function (err, result) {
                    if (err) {
                        let errorMessages = {
                            page: 'login.js',
                            message: 'login compare password errors',
                            login: false,
                            errors: err
                        }
                        res.json(errorMessages);
                    }

                    if(!result) {
                        if(chinese) {
                            title = '密码错误';
                        } else {
                            title = 'Incorrect password'
                        }
                        res.json({message: title, login: false, role: null})
                    } else {
                        let token = dbPassword.generateToken();
                        if(chinese) {
                            title = '密码正确';
                        } else {
                            title = 'Password is correct'
                        }
                        res.cookie('token', token).json({message: title, login: true, role: dbPassword.role})
                    }
    
                })
            } 

        } catch (err) {
            let errorMessages = {
                page: 'login.js',
                message: 'login compare password errors',
                login: false,
                errors: err
            }
            res.json(errorMessages);

        }
    })
    .get(checkToken ,async(req, res) => {
        // 自动检查用户身份。
        try {
            const token = req.cookies.token;
            let userData = await checkUser(token);// 可以检查 用户等级。
     
            res.json({message: 'token exist', login: true, role: userData.role})
       
        } catch(err) {
            let errorMessages = {
                page: 'login.js',
                message: 'check token failed',
                errors_message: err,
                login: false
            };

            console.log(errorMessages);

            res.json(errorMessages);
        }
    })

module.exports = router;


// const checkUser = async(req, res) => {
//     try {
//         const token = req.cookies.token;
//         const id = jwt.verify(token, jwtSecret);
//         // const user = await Password.findOne({_id: id});

//         console.log(id);

        
//     } catch(err) {
//         let errorMessges = {
//             page: 'checkToken_middleware.js',
//             message: 'checkUser errors',
//             errors_message: err, 
//             login: false
//         }

//         console.log(errorMessges)
//     }
// }