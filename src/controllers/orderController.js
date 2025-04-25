const {crOrder, gOrder, uOrder, dOrder} = require('../services/orderService');


module.exports = {
    postCreateOrder: async(req, res) => {
        let result = await crOrder(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    getOrder: async(req, res) => {
        let result = await gOrder(req.query);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    
    },

    putUpdateOrder: async(req, res) => {
        let result = await uOrder(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    
    },
    deleteOrder: async(req, res) => {
        let result = await dOrder(req.body.id);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
}