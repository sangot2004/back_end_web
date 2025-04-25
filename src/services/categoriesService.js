const Categories = require('../models/categories');
const aqp = require('api-query-params');

module.exports = {
    createCategory: async(data) => {
        if(data.type === 'EMPTY-CATEGORY'){
            let result = await Categories.create(data);
            return result;
        }

        if(data.type === 'ADD-FOOD'){
            let myCategories = await Categories.findById(data.categoriesId).exec();
            for(let i = 0; i < data.foodArr.length; i++){
                myCategories.foods.push(data.foodArr[i]);            
            }

            let newResult = await myCategories.save();
            return newResult;
        }
        return null;
    },

    getCategory: async (queryString) => {
        const page = queryString.page;
        const {filter, limit, population} = aqp(queryString);
        delete filter.page;
        let offset = (page - 1) * limit;
        result = await Categories.find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();

        return result;    
    },

    updateCategory: async (data) => {
        let result = await Categories.updateOne({_id: data.id}, {...data});
        return result;
    },

    deleteCategory: async (id) => {
        let result = await Categories.deleteById(id);
        return result;
    }
}