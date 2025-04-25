const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const orderdetailSchema = new mongoose.Schema({
    orderInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'order'},
    foods: [
         {type: mongoose.Schema.Types.ObjectId, ref: 'food'},
    ],
    recipient_name: String,
    address: String,
    note: String,

});

orderdetailSchema.plugin(mongoose_delete, {overrideMethods: 'all'});
const Orderdetail = mongoose.model('orderdetail', orderdetailSchema);

module.exports = Orderdetail;