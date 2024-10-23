import mongoose from 'mongoose';

const connectDB = async () => { 
    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {
        useNewUrlParser: true,    // options for compatibility
        useUnifiedTopology: true
    });
};

export default connectDB;