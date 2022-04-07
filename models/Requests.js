const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product Bidding request Schema
const RequestSchema = new Schema({
    item: {
        type : String,
        required: true
    },
    image: {
        type : String,
        required: true
    },
    request:{
    type: Map,
    of: String
    },
    requestedAt: {
        type:Date, 
        default:Date.now
    },
    responseCount : {
        type: Number,
        default : 0 
    },
    location:{
    },
    user: {type : Schema.Types.ObjectId, ref : 'User'},
    deal: {
        type: Boolean,
        default: false,
    },
    dealTo: {type : Schema.Types.ObjectId, ref : 'User'},
    
});

module.exports = mongoose.model('Request', RequestSchema);