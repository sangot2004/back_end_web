const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

//share data
const paymentSchema = new mongoose.Schema(
    {
        delivery:{
            type: String, 
            default: 'Giao tận nơi',
            required: true,
        },
        deliveryDate:{
            type: Date,
            default: Date.now,
        },
        note: String,
        recipientname: String,
        address: String,
        phone: String,
        orderCus: [{type: mongoose.Schema.Types.ObjectId, ref: 'ordercus'}],
    }
)


//Override all methods
paymentSchema.plugin(mongoose_delete, { overrideMethods: true });
const Payment = mongoose.model('payment', paymentSchema);
module.exports = Payment;