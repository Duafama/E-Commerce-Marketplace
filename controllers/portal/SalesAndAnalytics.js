const Order = require('../../models/order'); 
const mongoose = require('mongoose');

//im not good with mongoDb queries yet
async function getVendorSalesReport(req, res) {
    try {
        const vendorId = req.user.vendorId; 

        const report = await Order.aggregate([
            { 
                $match: { 
                    paymentStatus: 'paid',
                    vendorId: new mongoose.Types.ObjectId(vendorId) 
                } 
            },
            { $unwind: "$items" }, 
            {
                $group: {
                    _id: "$vendorId",
                    totalSales: { $sum: "$totalAmount" },
                    totalOrders: { $sum: 1 },
                    avgOrderValue: { $avg: "$totalAmount" },
                    totalItemsSold: { $sum: "$items.quantity" },
                    firstOrder: { $min: "$createdAt" },
                    lastOrder: { $max: "$createdAt" }
                }
            }
        ]);

        res.json(report);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch vendor report' });
    }
}

module.exports = { getVendorSalesReport };
