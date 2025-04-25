
const Food = require('../models/food');
const aqp = require('api-query-params');

module.exports = {
    createFood: async (data) => {
        try {
            // Kiểm tra và chuyển categoriesInfo thành ObjectId nếu là string
            if (data.categoriesInfo && typeof data.categoriesInfo === 'string') {
                data.categoriesInfo = mongoose.Types.ObjectId(data.categoriesInfo);
            }

            let result = await Food.create({
                name: data.name,
                price: data.price,
                description: data.description,
                categoriesInfo: data.categoriesInfo,
                image: data.image
            });
            return result;
        } catch (error) {
            console.log('Error creating food:', error);
            return null;
        }
    },

    getFood: async (queryString) => {
        const page = queryString.page;
        const {filter, limit, population} = aqp(queryString);
        let offset = (page - 1) * limit;
        result = await Food.find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();
        return result;    
    },

    updateFood: async (data) => {
        let result = await Food.updateOne({_id: data.id}, {...data});
        return result;
    },

    deleteFood: async (id) => {
        let result = await Food.deleteById(id);
        return result;
    }

}