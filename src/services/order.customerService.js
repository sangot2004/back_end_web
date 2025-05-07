const OrderCus = require('../models/order.customer');
const aqp = require('api-query-params');
const Food = require('../models/food'); // đảm bảo đúng đường dẫn


module.exports = {
    gOrderCus: async (queryString) => {
        const page = parseInt(queryString.page);
        const { filter, limit = 10, population, sort: aqpSort } = aqp(queryString);
        const offset = (page - 1) * limit;
    
        // ✅ Thêm lọc theo khoảng giá
        if (queryString.minPrice || queryString.maxPrice) {
            filter.totalPrice = {};
            if (queryString.minPrice) {
                filter.totalPrice.$gte = parseFloat(queryString.minPrice);
            }
            if (queryString.maxPrice) {
                filter.totalPrice.$lte = parseFloat(queryString.maxPrice);
            }
        }
    
        // ✅ Sắp xếp
        let sort = aqpSort || {};
        if (queryString.sort === 'price_asc') {
            sort = { totalPrice: 1 };
        } else if (queryString.sort === 'price_desc') {
            sort = { totalPrice: -1 };
        }
    
        const totalOrders = await OrderCus.countDocuments(filter);
    
        const data = await OrderCus.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .sort(sort)
            .exec();
    
        const totalPages = Math.ceil(totalOrders / limit);
    
        return {
            data,
            currentPage: page,
            totalOrdersInPage: data.length,
            totalPages,
            totalOrders
        };
    },
    

    crOrderCus: async (data) => {
        try {
            // Tìm món ăn theo tên
            const food = await Food.findOne({ name: data.nameFood });
            if (!food) {
                throw new Error('Không tìm thấy món ăn');
            }
    
            // Tính tổng giá
            const total = food.price * data.quantity;
    
            // Tạo đơn hàng
            const result = await OrderCus.create({
                nameFood: data.nameFood,
                quantity: data.quantity,
                totalPrice: total
            });
    
            return result;
        } catch (err) {
            console.error('Lỗi tạo đơn hàng:', err.message);
            return null;
        }
    }
}