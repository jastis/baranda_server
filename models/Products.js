const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name : {
        type:String,
        required: true,
        },
    image: {
        type: String,
        required: true,
        },
    thumbnail: String,
    uploadedAt:{
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model('Product', ProductSchema);