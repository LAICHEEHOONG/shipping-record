const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
    ship_to: {
        type: String,
        required: true,
        trim: true
    },
    courier_: {
        type: String,
        required: true,
        trim: true
    },
    cn_: {
        type: String,
        trim: true
    },
    carton_: {
        type: Number,
        trim: true
    },
    weight_: {
        type: Number,
        trim: true
    },
    do_: [],
    wxr_: [],
    remark_: [],
    date: {
        type: String,
        trim: true,
        required: true
    },
    time: {
        type: Number,
        trim: true,
        required: true
    }

})

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = { Delivery };
