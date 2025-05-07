const {crOrderCus, gOrderCus} = require('../services/order.customerService');


module.exports = {
    postCreateOrderCustomer: async(req, res) => {
        let result = await crOrderCus(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    getOrderCustomer: async (req, res) => {
        let result = await gOrderCus(req.query);
        return res.status(200).json({
            EC: 0,
            ...result  // Gộp các field: total, currentPage, data,...
        });
    }
    

    // putUpdateOrder: async(req, res) => {
    //     let result = await uOrder(req.body);
    //     return res.status(200).json({
    //         EC: 0,
    //         data: result
    //     })
    
    // },
    // deleteOrder: async(req, res) => {
    //     let result = await dOrder(req.body.id);
    //     return res.status(200).json({
    //         EC: 0,
    //         data: result
    //     })
    // }
}