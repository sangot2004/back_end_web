const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

//share data
// const categoriesSchema = new mongoose.Schema({
//     name: String
// })

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    nameCategory: String,
    price: Number,
    description: String,
    image: String,
    categoriesInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
},
    {
        timestamps: true,
    }
);


//
foodSchema.plugin(mongoose_delete, {overrideMethods: 'all'});
const Food = mongoose.model('food', foodSchema);

module.exports = Food;