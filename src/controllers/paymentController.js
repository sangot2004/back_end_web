const {crPayment, gPayment} = require('../services/paymentService');


module.exports = {
    postPayment: async(req, res) => {
        let result = await crPayment(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    getPayment: async (req, res) => {
        let result = await gPayment(req.query);
        return res.status(200).json({
            EC: 0,
            ...result  // Gộp các field: total, currentPage, data,...
        });
    }
}