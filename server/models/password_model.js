
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 2;
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const jwtSecret = process.env.JWT_SECRET;

const passwordSchema = mongoose.Schema({
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'guest'],
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true

    }
});

//save 之前加密密码
passwordSchema.pre('save', function(next) {

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) {
            console.log({
                errors: err,
                page: 'password_model.js',
                message: 'genSalt error'
            });
            next();
        }

        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) {
                console.log({
                    errors: err,
                    page: 'password_model.js',
                    message: 'hash error'
                });
                next();
            }
            this.password = hash;
            next();
        })
    })

})

//验证 登入密码
passwordSchema.method('comparePassword', function(password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        if(err) {
            const errorMessages = {
                errors: err,
                page: 'password_model.js',
                message: 'bcrypt compare errors'
            }
            console.log(errorMessages);

            cb(errorMessages);
        }
        cb(null, result);
    })
})

//生成 token
passwordSchema.method('generateToken', function() {
    let token = jwt.sign(this._id.toString(), jwtSecret);
    return token;
})

const Password = mongoose.model('Password', passwordSchema);

module.exports = { Password };