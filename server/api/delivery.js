const express = require('express');
let router = express.Router();
const { Delivery } = require('../models/delivery_model');

router.route('/')
    .post(async (req, res) => {
        // 储存物流资料到数据库。
        try {
            const deliveryData = req.body.data;

            let saveDeliveryData = new Delivery({ ...deliveryData });
            await saveDeliveryData.save();

            res.json({ message: 'Delivery data saved' });

        } catch (err) {
            let errMessage = {
                page: 'deliver.js',
                message: 'get delivery record data failed',
                error_message: err
            }
            console.log(errMessage);
            res.json(errMessage);
        }
    })
    .get(async (req, res) => {
        // 从数据库提取物流资料。
        try {
            const allDeliveryData = await Delivery.find().sort({ time: 'desc' });

            res.json(allDeliveryData);

        } catch (err) {
            const errorsMessage = {
                page: 'api/delivery.js',
                message: '从数据库提取物流资料失败',
                errors_message: err
            }
            console.log(errorsMessage);
            res.json(errorsMessage);
        }
    })
    .delete(async (req, res) => {
        try {
            const id = req.body.id;

            const deleteData = await Delivery.findByIdAndRemove(id);

            console.log(deleteData);

            res.json('物流资料已删除。')


        } catch (err) {
            const errMessage = {
                page: 'delivery.js',
                message: '删除物流记录发生错误',
                errors_message: err
            }

            console.log(errMessage);
            res.json(errMessage);
        }
    })
    .patch(async (req, res) => {
        // 储存编辑数据
        try {
            let {
                _id,
                carton_,
                ship_to,
                courier_,
                cn_,
                weight_,
                do_,
                wxr_,
                remark_
            } = req.body;

            let editData = await Delivery.updateOne({ _id }, { '$set': { ...req.body } })

            res.json({ message: 'edit done', bool: true })
            // let beforeData = await Delivery.findOne({_id}); //Object {}



        } catch (err) {
            const errMessage = {
                page: 'api/delivery.js',
                message: '编辑数据失败。',
                errors_message: 'err',
                bool: false
            }
            console.log(errMessage);
            res.json(errMessage);
        }
    })


module.exports = router;    
