const {createCategory, getCategory, updateCategory, deleteCategory} = require('../services/categoriesService');


module.exports = {
    postCreateCategoryAPI: async (req, res) =>{
        let result = await createCategory(req.body);
        res.status(200).json({
            EC: 0, 
            data: result
        })
    },
    getCategoryAPI: async (req, res) => {
        let result = await getCategory(req.query);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    updateCategoryAPI: async (req, res) => {
        let result = await updateCategory(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    deleteCategoryAPI: async (req, res) => {
        let result = await deleteCategory(req.body.id);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
    
}