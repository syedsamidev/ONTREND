import UserModel from "../models/userModel.js";

//Add products to user cart
const addToCart = async (req,res) => {
    try {
        const {userId, itemId, size } = req.body;
        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] +=1
            }
            else {
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await UserModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Added to cart"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//update products in user cart
const updateCart1 = async (req,res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;  // Update the quantity
        } else {
            return res.json({ success: false, message: "Item not found in the cart" });
        }

        await UserModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart updated successfully" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await UserModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[itemId] && cartData[itemId][size]) {
            if (quantity === 0) {
                // If quantity is 0, delete the specific size
                delete cartData[itemId][size]; 

                // If no sizes are left for the item, delete the item itself
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            } else {
                // Update the quantity if it’s not 0
                cartData[itemId][size] = quantity;
            }
        } else {
            return res.json({ success: false, message: "Item or size not found in the cart" });
        }

        // Save the updated cartData to the database
        await UserModel.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, message: "Cart updated successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};



// get user cart data
const getUserCart = async (req,res) => {
    try {
        const { userId } = req.body;
        const userData = await UserModel.findById(userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {addToCart, updateCart, getUserCart};