const express = require('express');
let router = express.Router();

const { Password } = require('../models/password_model');

router.route('/')
    .post(async (req, res) => {
        // 创建密码(暂时没有限制重复。)
        try {
            const password = req.body.password;
            const role = req.body.role;
            const username = req.body.username;

            let createPassword = new Password({ password, role, username });

            await createPassword.save();

            res.json({ message: 'account created' });

        } catch (err) {
            let errorMessages = {
                errors_message: err,
                page: 'password.js',
                message: 'save password to DB failed',
                login: false
            }
            console.log(errorMessages);
            res.json(errorMessages);
        }
    })

module.exports = router;    

//admin: 0175337331, username: laicheehoong
//guest: guest1234, username: guest