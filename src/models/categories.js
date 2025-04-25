const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

//share data
const categoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,        
        },
        foods: [{type: mongoose.Schema.Types.ObjectId, ref: 'food'}],
    }
)


//Override all methods
categoriesSchema.plugin(mongoose_delete, { overrideMethods: true });
const Categories = mongoose.model('categories', categoriesSchema);
module.exports = Categories;