const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = Users = mongoose.model('user', UserSchema, 'users');