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
        const page = parseInt(queryString.page) || 1;
        const { filter, limit, population } = aqp(queryString);
        let offset = (page - 1) * limit;
    
        // Thêm xử lý tìm kiếm mờ (partial match)
        let searchFilter = {};
        if (queryString.name) {
            searchFilter.name = { $regex: queryString.name, $options: 'i' }; // 'i' = ignore case
        }
    
        // Thêm xử lý sắp xếp theo giá
        let sort = {};
        if (queryString.sort) {
            if (queryString.sort === 'price_asc') {
                sort.price = 1; // Sắp xếp giá tăng dần
            } else if (queryString.sort === 'price_desc') {
                sort.price = -1; // Sắp xếp giá giảm dần
            }
        }
    
        // Kết hợp filter và searchFilter để tìm kiếm theo tên loại món
        const categories = await Categories.find({ ...filter, ...searchFilter })
            .populate(population)
            .skip(offset)
            .limit(limit)
            .sort(sort) // Áp dụng sắp xếp
            .exec();
    
        // Đếm số món ăn dựa trên length của foods
        const result = categories.map((category) => {
            return {
                ...category.toObject(), // Convert document thành object thường
                foodCount: category.foods ? category.foods.length : 0
            };
        });
    
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