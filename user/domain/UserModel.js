const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },

    name: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    birthdate: Date,
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
 
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;