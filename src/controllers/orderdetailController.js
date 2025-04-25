const {crOrderDetail, gOrderDetail} = require('../services/orderdetailService');

module.exports = {
    postCreateOrderDetail: async (req, res) => {
        let result = await crOrderDetail(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    getOrderDetail: async (req, res) => {
        let result = await gOrderDetail(req.query);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }

}