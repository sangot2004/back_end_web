const Order = require('../models/order');
const aqp = require('api-query-params');

module.exports = {
    gOrder: async (queryString) => {
        const page = queryString.page;

        const {filter, limit, population} = aqp(queryString);
        delete filter.page;
        let offset = (page - 1) * limit;
        result = await Order.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec();
        return result;
    },

    crOrder: async (data) => {
        try {
            // Kiểm tra và chuyển customerInfo thành ObjectId nếu là đối tượng có $oid
            if (data.customerInfo && typeof data.customerInfo === 'object' && data.customerInfo.$oid) {
                data.customerInfo = mongoose.Types.ObjectId(data.customerInfo.$oid);
            }

            const newOrder = await Order.create(data);  // Tạo đơn hàng mới
            return newOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            return null;
        }
    },

    uOrder: async (data) => {
        let result = await Order.updateOne({_id: data.id}, {...data});
        return result;
    },

    dOrder: async (id) => {
        let result = await Order.deleteById({_id: id});
        return result;
    }
}