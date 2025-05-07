// const mongoose = require('mongoose');
// const mongoose_delete = require('mongoose-delete');

// //shape data
// const customerSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         address: String,
//         phone: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         email: String,
//         password: {
//             type: String,
//             required: true
//         },
//         createat: {
//             type: Date,
//             default: Date.now
//         },
//         status:{
//             type: String,
//             default: 'ACTIVE'
//         },
//         admin: {
//             type: Boolean,
//             default: false // admin: true
//         },
//         orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }]
//     }
// );

// // Override all methods
// customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

// const Customer = mongoose.model('customer', customerSchema);

// module.exports = Customer;
