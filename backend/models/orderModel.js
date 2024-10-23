import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    phoneNumber: {
        type: Number,  // or Number, depending on how you want to store it
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Order Placed"
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Number,
        required: true
    }
})

const OrderModel = mongoose.models.Order || mongoose.model('Order',orderSchema); 

export default OrderModel;