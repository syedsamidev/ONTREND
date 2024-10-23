import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";


// Placing orders using COD
const placeOrder = async (req, res) => {
    try {
      const { userId, items, amount, address, phoneNumber } = req.body;
  
      // Create new order data (without userId for guest orders)
      const orderData = {
        items,
        amount,
        address,
        phoneNumber,
        paymentMethod: 'COD', // Cash on Delivery
        payment: false, // Payment status depends on method
        date: Date.now(),
      };
  
      // Include userId if the user is logged in
      if (userId) {
        orderData.userId = userId;
        // Optionally, you can clear the cart for logged-in users
        await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      }
  
      const newOrder = new OrderModel(orderData);
      await newOrder.save();
  
      res.json({ success: true, message: "Order Placed" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  

// Placing orders using Debit/Credit Cards



// All orders data for Admin Panel
const allOrders = async (req,res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// All orders data for Front End
const userOrders = async (req,res) => {
    try {
        const {userId} = req.body;
        
        const orders = await OrderModel.find({userId})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// update orders status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        const { orderId, status } = req.body;

        // Find the order by ID and update its status
        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, { status });

        if (!updatedOrder) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order status updated", updatedOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {placeOrder, allOrders, userOrders, updateStatus}