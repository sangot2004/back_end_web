// require('dotenv').config();

// const Customer = require('../models/customer');
// const aqp = require('api-query-params');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const saltRounds = 10;


// module.exports = {
//     createCustomer: async (data) => {
//         if(data.type === 'EMPTY-CUSTOMER'){

//             //hash password
//             const hashedPassword = await bcrypt.hash(data.password, saltRounds);
//             data.password = hashedPassword;

//             let result = await Customer.create(data);
//             return result;
//         }

//         if(data.type === 'ADD-ORDER'){
//             let myCustomer = await Customer.findById(data.customerId).exec();
//             for(let i = 0; i < data.orderArr.length; i++){
//                 myCustomer.orders.push(data.orderArr[i]);
//             }
//             let newResult = await myCustomer.save();
//             return newResult;
//         }
//         return null;
//     },

//     loginService: async (phone1, password) => {
//         try {
//             //fetch user by email
//             const customer = await Customer.findOne({phone: phone1});
//             if(customer){
//                 //compare pass
//                 const isMatchPassword = await bcrypt.compare(password, customer.password);
//                 if(!isMatchPassword){
//                     return {
//                         EC: 2,
//                         EM: "Phone/Password không hợp lệ"
//                     }
//                 }else {
//                     //create an access token
//                     const payload = {
//                         phone: customer.phone,
//                         name: customer.name
//                     }
//                     const accessToken = jwt.sign(
//                         payload,
//                         process.env.JWT_SECRET,
//                         {
//                             expiresIn: process.env.JWT_EXPIRE
//                         }
//                     );
//                     return {
//                         accessToken,
//                         customer: {
//                             phone: customer.phone,
//                             name: customer.name
//                         }
//                     }
//                 }
//             }else{
//                 return {
//                     EC: 1,
//                     EM: "Phone/Password không hợp lệ"
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//             return null;
//         }
//     },

//     gCustomer: async (queryString) => {
//         const page = queryString.page;
//         const {filter, limit, population} = aqp(queryString);
//         delete filter.page;

//         let offset = (page - 1) * limit;
//         result = await Customer.find(filter).populate(population).skip(offset).limit(limit).exec();
//         return result;
//     },

//     uCustomer: async (data) => {
//         let result = await Customer.updateOne({_id: data.id}, {...data});
//         return result;
//     },

//     dCustomer: async (id) => {
//         let result = await Customer.deleteById({_id: id});
//         return result;
//     }
// }