const mongoose = require('mongoose');
const config = require('../config/config');

async function connectToDatabase() {
    try {
        await mongoose.connect(config.mongodb.url, config.mongodb.options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports =  connectToDatabase ;