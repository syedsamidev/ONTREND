import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

// function for add product
const addProduct = async (req,res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === 'true' ? 'true' : 'false',
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const newProduct = new productModel(productData);
        await newProduct.save();

        res.json({ success: true, message: 'Product added successfully', product: newProduct });
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// function for list product
const listProducts = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({success: true, products});
    } catch (error) {
        res.status(500).json({success: false, message: "Error fetching products", error: error.message });
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;

        // Find and delete the product
        const removedProduct = await productModel.findByIdAndDelete(id);

        // Check if the product was actually found and removed
        if (!removedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // If successful, return a success message
        res.status(200).json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        // If there's an error, return a 500 status and the error message
        res.status(500).json({ success: false, message: "Error removing product", error: error.message });
    }
};


// function for single product info
const singleProduct = async (req,res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({success:false, message: "Product not found" });
        }
        res.status(200).json({success:true, product});

    } catch (error) {
        res.status(500).json({success:false, message: "Error fetching product details", error: error.message });
    }

}

export { addProduct, listProducts, removeProduct, singleProduct}