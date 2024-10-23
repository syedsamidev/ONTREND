import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET) 
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

         // Generate JWT token
         const token = createToken(user._id);

         res.json({
             success: true,
             message: 'Login successful',
             token
         });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
        
    }

}


//Route for user registration

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking user exists?
        let user = await UserModel.findOne({email})
        if (user) {
            return res.json({success: false ,message: 'User already exists' });
        }

        //validating email and password
        if (!validator.isEmail(email)) {
            return res.json({success: false ,message: 'Please enter a valid email' });
        }

        if (password.length < 8) {
            return res.json({success: false ,message: 'Please enter a strong password' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = createToken(newUser._id);

        res.json({success : true,
            message: 'User registered successfully',
            token,
        });

    } catch (error) {
        res.status(500).json({success: false ,message: 'Server error', error: error.message });
    }
}

//Route for admin login
const adminLogin = async (req,res) =>{
    try {
        const { email, password } = req.body;
        
        if (email === process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD){
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            res.json({success:true, token})
        } else{
            return res.status(401).json({success: false, message: 'Unauthorized: Invalid credentials' });
        }
        
    } catch (error) {
        return res.status(500).json({success:false, message: 'Server error', error: error.message });
    }
}

export {loginUser, registerUser, adminLogin}