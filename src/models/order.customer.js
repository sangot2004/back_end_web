const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const orderCusSchema = new mongoose.Schema({
    nameFood: String,
    quantity: Number,
    creatat: {
        type: Date,
        default: Date.now,
    },
    totalPrice: Number,
    note: String,
    status: {
        type: String,
        default: 'chưa xử lý'
    }
});

orderCusSchema.plugin(mongoose_delete, { overrideMethods: true });
const OrderCus = mongoose.model('ordercus', orderCusSchema);

module.exports = OrderCus;