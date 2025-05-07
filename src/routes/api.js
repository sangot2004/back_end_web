const express = require('express');
const routerAPI = express.Router();

const auth = require('../middleware/auth');

const { postUploadSingleFileAPI, postUploadMultipleFileAPI} = require('../controllers/apiController');
const { postCreateCategoryAPI, getCategoryAPI, updateCategoryAPI, deleteCategoryAPI} = require('../controllers/categoriesController');
const { postCreateFoodAPI, getFoodAPI, UpdateFoodAPI, deleteFoodAPI} = require('../controllers/foodController');
// const {postCreateCustomer, getAllCustomer,
//     putUpdateCustomer, deleteCustomer, handleLogin, getAccount
// } = require('../controllers/customerController');
const {postCreateOrder, getOrder, putUpdateOrder, deleteOrder} = require('../controllers/orderController');
const {postCreateOrderDetail, getOrderDetail} = require('../controllers/orderdetailController');
const {postCreateUser, getAllUser, putUpdateUser, deleteUser, handleLogin, getAccount} = require('../controllers/userController');

const {getOrderCustomer, postCreateOrderCustomer} = require('../controllers/order.customerController');
const {getPayment, postPayment} = require('../controllers/paymentController');



// routerAPI.all('*', auth);


//upload file
routerAPI.post('/file', postUploadSingleFileAPI);
routerAPI.post('/files',postUploadMultipleFileAPI);



//categories
routerAPI.post('/categories', postCreateCategoryAPI);
routerAPI.get('/categories', getCategoryAPI);
routerAPI.put('/categories', updateCategoryAPI);
routerAPI.delete('/categories', deleteCategoryAPI);

//food
routerAPI.post('/foods', postCreateFoodAPI);
routerAPI.get('/foods', getFoodAPI);
routerAPI.put('/foods', UpdateFoodAPI);
routerAPI.delete('/foods', deleteFoodAPI);

//customer
// routerAPI.post('/customers', postCreateCustomer);
// routerAPI.post('/login',handleLogin);
// routerAPI.get('/customers', getAllCustomer);
// routerAPI.put('/customers', putUpdateCustomer);
// routerAPI.delete('/customers', deleteCustomer);
// routerAPI.get('/account', getAccount);

//user
routerAPI.post('/user', postCreateUser);
routerAPI.post('/login',handleLogin);
routerAPI.get('/user', getAllUser);
routerAPI.put('/user', putUpdateUser);
routerAPI.delete('/user', deleteUser);
routerAPI.get('/account', getAccount);


//order
routerAPI.post('/orders', postCreateOrder);
routerAPI.get('/orders', getOrder);
routerAPI.put('/orders', putUpdateOrder);
routerAPI.delete('/orders', deleteOrder);


//orderdetail
routerAPI.get('/orderdetails', getOrderDetail);
routerAPI.post('/orderdetails', postCreateOrderDetail); 

//ordercustomer
routerAPI.get('/ordercustomer', getOrderCustomer);
routerAPI.post('/ordercustomer', postCreateOrderCustomer);
// routerAPI.put('/ordercustomers', putUpdateOrderCustomer);
// routerAPI.delete('/ordercustomers', deleteOrderCustomer);

//payment
routerAPI.get('/payment',getPayment);
routerAPI.post('/payment',postPayment);



// routerAPI.get('/customers', getAllCustomers);
// routerAPI.put('/customers', putUpdateCustomers);
// routerAPI.delete('/customers', deleteACustomer);
// routerAPI.delete('/customers-many', deleteArrayCustomer);

module.exports = routerAPI;