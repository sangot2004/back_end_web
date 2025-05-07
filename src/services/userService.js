require('dotenv').config();

const User = require('../models/user');
const aqp = require('api-query-params');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


module.exports = {
    createUser: async (data) => {
        if(data.type === 'EMPTY-USER'){

            //hash password
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;

            let result = await User.create(data);
            return result;
        }

        if(data.type === 'ADD-ORDER'){
            let myUser = await User.findById(data.userId).exec();
            for(let i = 0; i < data.orderArr.length; i++){
                myUser.orders.push(data.orderArr[i]);
            }
            let newResult = await myUser.save();
            return newResult;
        }
        return null;
    },

    loginService: async (phone1, password) => {
        try {
            //fetch user by email
            const user = await User.findOne({phone: phone1});
            if(user){
                //compare pass
                const isMatchPassword = await bcrypt.compare(password, user.password);
                if(!isMatchPassword){
                    return {
                        EC: 2,
                        EM: "Phone/Password không hợp lệ"
                    }
                }else {
                    //create an access token
                    const payload = {
                        phone: user.phone,
                        name: user.name
                    }
                    const accessToken = jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {
                            expiresIn: process.env.JWT_EXPIRE
                        }
                    );
                    return {
                        accessToken,
                        user: {
                            phone: user.phone,
                            name: user.name
                        }
                    }
                }
            }else{
                return {
                    EC: 1,
                    EM: "Phone/Password không hợp lệ"
                }
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    gUser: async (queryString) => {
        const page = parseInt(queryString.page) || 1;
        const { filter, limit = 10, population } = aqp(queryString);
        delete filter.page;
    
        // ✅ Thêm tìm kiếm theo name (nếu có)
        if (queryString.name) {
            filter.name = { $regex: queryString.name, $options: 'i' }; // 'i' = không phân biệt hoa thường
        }
    
        const offset = (page - 1) * limit;
    
        const totalUsers = await User.countDocuments(filter); // tổng số người dùng
    
        const users = await User.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec();
    
        return {
            users,
            totalUsers,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
        };
    },  
    

    uUser: async (data) => {
        let result = await User.updateOne({_id: data.id}, {...data});
        return result;
    },

    dUser: async (id) => {
        let result = await User.deleteById({_id: id});
        return result;
    }
}