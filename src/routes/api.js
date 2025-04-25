const express = require('express');
const routerAPI = express.Router();

const delay = require('../middleware/delay');

const { postUploadSingleFileAPI, postUploadMultipleFileAPI} = require('../controllers/apiController');
const { postCreateCategoryAPI, getCategoryAPI, updateCategoryAPI, deleteCategoryAPI} = require('../controllers/categoriesController');
const { postCreateFoodAPI, getFoodAPI, UpdateFoodAPI, deleteFoodAPI} = require('../controllers/foodController');
const {postCreateCustomer, getAllCustomer,
    putUpdateCustomer, deleteCustomer, handleLogin
} = require('../controllers/customerController');
const {postCreateOrder, getOrder, putUpdateOrder, deleteOrder} = require('../controllers/orderController');
const {postCreateOrderDetail, getOrderDetail} = require('../controllers/orderdetailController');


routerAPI.all('*', delay);


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
routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/login',handleLogin);
routerAPI.get('/customers', getAllCustomer);
routerAPI.put('/customers', putUpdateCustomer);
routerAPI.delete('/customers', deleteCustomer);


//order
routerAPI.post('/orders', postCreateOrder);
routerAPI.get('/orders', getOrder);
routerAPI.put('/orders', putUpdateOrder);
routerAPI.delete('/orders', deleteOrder);


//orderdetail
routerAPI.get('/orderdetails', getOrderDetail);
routerAPI.post('/orderdetails', postCreateOrderDetail);

// routerAPI.get('/customers', getAllCustomers);
// routerAPI.put('/customers', putUpdateCustomers);
// routerAPI.delete('/customers', deleteACustomer);
// routerAPI.delete('/customers-many', deleteArrayCustomer);

module.exports = routerAPI;