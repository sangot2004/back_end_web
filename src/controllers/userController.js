const { createUser, gUser, uUser, dUser, loginService} = require('../services/userService');
//{key: value}



module.exports = {
    postCreateUser: async (req, res) => {

        let user = await createUser(req.body);

        return res.status(200).json({
            EC: 0,
            data: user 
        })
    },

    handleLogin: async (req, res) => {
        const {phone, password} = req.body;
        const data = await loginService(phone, password);
        return res.status(200).json({
            data
        })
    },

    getAccount: async (req, res) => {
        return res.status(200).json({
            data: req.user
        })
    }, 
    
    getAllUser: async (req, res) => {
        const { users, totalUsers } = await gUser(req.query);
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const totalPages = Math.ceil(totalUsers / limit);
    
        return res.status(200).json({
            EC: 0,
            data: users,
            currentPage: page,
            totalPages,
            totalUsersInPage: users.length,
            totalUsers
        });
    },
    
    putUpdateUser: async (req, res) => {
        let result = await uUser(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    deleteUser: async (req, res) => {
        let result = await dUser(req.body.id);
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