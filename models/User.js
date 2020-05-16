const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    isAdmin: {type: Boolean, default: false},
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    img: {type: String, default:'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'},
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema)