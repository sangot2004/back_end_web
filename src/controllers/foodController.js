const { createFood, getFood, updateFood, deleteFood } = require("../services/foodService");
const {uploadSingleFile} = require('../services/fileService');



module.exports = {
    postCreateFoodAPI: async (req, res) => {

        let {name, nameCategory, price, description, categoriesInfo} = req.body;

        let imageUrl = "";

        if(!req.files || Object.keys(req.files).length === 0){
            //do nothing
        } else{
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
        }

        let foodData = {
            name,
            nameCategory,
            price,
            description,
            categoriesInfo,
            image: imageUrl
        }



        let food = await createFood(foodData);
        return res.status(200).json({
            EC: 0,
            data: food
        })
    },

    getFoodAPI: async (req, res) => {
        const { foods, totalItems } = await getFood(req.query);
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit); // cần lấy limit từ query
    
        const totalPages = Math.ceil(totalItems / limit); // tính tổng số trang
    
        return res.status(200).json({
            EC: 0,
            data: foods,
            totalFoods: foods.length,
            currentPage: page,
            totalPages,
            totalItems
        });
    },
    
    

    UpdateFoodAPI: async(req, res) => {
        let result = await updateFood(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    deleteFoodAPI: async(req, res) => {
        let result = await deleteFood(req.body.id);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
}