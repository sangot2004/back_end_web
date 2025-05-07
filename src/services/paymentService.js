
const Payment = require('../models/payment');
const aqp = require('api-query-params');

module.exports = {
    crPayment: async(data) => {
        if(data.type === 'EMPTY-PAYMENT'){
            let result = await Payment.create(data);
            return result;
        }

        if(data.type === 'ADD-ORDERCUS'){
            let myPayment = await Payment.findById(data.paymentId).exec();
            for(let i = 0; i < data.ordercusArr.length; i++){
                myPayment.orderCus.push(data.ordercusArr[i]);            
            }

            let newResult = await myPayment.save();
            return newResult;
        }
        return null;
    },

    gPayment: async (queryString) => {
        const page = queryString.page;
        const {filter, limit, population} = aqp(queryString);
        delete filter.page;

        let offset = (page - 1) * limit;
        result = await Payment.find(filter).populate(population).skip(offset).limit(limit).exec();
        return result;
    },
}