const Orderdetail = require('../models/orderdetail');
const aqp = require('api-query-params');

module.exports = {
    crOrderDetail: async(data) => {
        if(data.type === 'EMPTY-ORDERDETAIL'){
            if (data.orderInfo && typeof data.orderInfo === 'object' && data.orderInfo.$oid) {
                data.orderInfo = mongoose.Types.ObjectId(data.orderInfo.$oid);
            }
            let result = await Orderdetail.create(data);
            return result;
        }
        if(data.type === 'ADD-FOOD'){
            let myOrderDetail = await Orderdetail.findById(data.orderDetailId).exec();
            for(let i = 0; i < data.foodArr.length; i++){
                myOrderDetail.foods.push(data.foodArr[i]);
            }
            let newResult = await myOrderDetail.save();
            return newResult;
        }
        return null;
    },

    gOrderDetail: async (queryString) => {
        const page = queryString.page;

        const {filter, limit, population} = aqp(queryString);
        delete filter.page;
        let offset = (page - 1) * limit;
        result = await Orderdetail.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec();
        return result;
    },
}