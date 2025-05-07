
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
                nameCategory: data.nameCategory,
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
        const page = parseInt(queryString.page);
        const { filter, population, limit, sort: aqpSort } = aqp(queryString);
        const offset = (page - 1) * limit;
    
        let searchFilter = {};
    
        // 🔍 Lọc theo tên (nếu có)
        if (queryString.name) {
            searchFilter.name = { $regex: queryString.name, $options: 'i' };
        }
    
        // 🔍 Lọc theo khoảng giá (nếu có)
        if (queryString.minPrice || queryString.maxPrice) {
            searchFilter.price = {};
            if (queryString.minPrice) {
                searchFilter.price.$gte = parseFloat(queryString.minPrice);
            }
            if (queryString.maxPrice) {
                searchFilter.price.$lte = parseFloat(queryString.maxPrice);
            }
        }
    
        const finalFilter = { ...filter, ...searchFilter };
    
        // 🔽 Xử lý sắp xếp
        let sort = aqpSort || {};
        if (queryString.sort === 'price_asc') {
            sort = { price: 1 };
        } else if (queryString.sort === 'price_desc') {
            sort = { price: -1 };
        }
    
        const totalItems = await Food.countDocuments(finalFilter);
    
        const foods = await Food.find(finalFilter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .sort(sort)
            .exec();
    
        return {
            foods,
            totalItems,
        };
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