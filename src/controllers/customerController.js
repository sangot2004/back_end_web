const { createCustomer, gCustomer, uCustomer, dCustomer, loginService} = require('../services/customerService');
//{key: value}
const aqp = require('api-query-params');



module.exports = {
    postCreateCustomer: async (req, res) => {

        let customer = await createCustomer(req.body);

        return res.status(200).json({
            EC: 0,
            data: customer
        })
    },

    handleLogin: async (req, res) => {
        const {phone, password} = req.body;
        const data = await loginService(phone, password);
        return res.status(200).json({
            data
        })
    },
    
    getAllCustomer: async (req, res) => {
        let result = await gCustomer(req.query);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    putUpdateCustomer: async (req, res) => {
        let result = await uCustomer(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    deleteCustomer: async (req, res) => {
        let result = await dCustomer(req.body.id);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
}
    // getAllCustomers: async (req, res) => {


    //     let limit = req.query.limit;
    //     let page = req.query.page;
    //     let name = req.query.name;
    //     let result = null;

    //     if(limit && page){
    //         result = await getAllCustomersService(limit, page, name,req.query);
    //     }else
    //         result = await getAllCustomersService();
    //     return res.status(200).json({
    //         EC: 0, 
    //         data: result
    //     })
    // },
    // putUpdateCustomers: async (req, res) => {
    //     let {id, name, email, address} = req.body;
    //     let result = await putUpdateCustomerService(id, name, email, address);
    //     return res.status(200).json({
    //         EC: 0,
    //         data: result
    //     })
    // },
    // deleteACustomer: async (req, res) => {
    //     let id = req.body.id;
    //     let result = await deleteACustomerService(id);
    //     return res.status(200).json({
    //         EC: 0,
    //         data: result
    //     })
    // },
    // deleteArrayCustomer: async (req, res) => {
    //     let ids = req.body.customersId;
    //     console.log('ids: ', ids);
    //     let result = await deleteArrayCustomerService(ids);
    //     return res.status(200).json({
    //         EC: 0,
    //         data: result
    //     })
    // }