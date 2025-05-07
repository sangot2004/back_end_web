const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const orderSchema = new mongoose.Schema({
    customerInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    orderCus: {
        type: String,
    },
    creatat: {
        type: Date,
        default: Date.now,
    },
    totalPrice: Number,
    status:{
        type: String,
        default: 'chưa xử lý'
    }
});

orderSchema.plugin(mongoose_delete, { overrideMethods: true });
const Order = mongoose.model('order', orderSchema);

module.exports = Order;