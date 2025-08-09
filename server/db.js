const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 

const connectDb = async() => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error('MongoDB connection error: ', error.message);
        process.exit(1);
    }
};

module.exports = connectDb;