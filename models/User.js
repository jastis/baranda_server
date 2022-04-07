const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name :{
        type: String,
        required: true,
    },
    last_name : {
        type:String,
        required:true,
    },
    phone_no : {
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },

    picture:{
        type:String,
        required: false,
    },
    usertype: {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer',
    },
    sells : [],
    location : {},
    token:{
        type: String,
    },
    active: {
        type : Boolean,
        default: false,
    }
});

UserSchema.virtual('fullname').get(function(){
    let fullname = '';
    if(this.first_name && this.last_name){
        fullname = this.first_name + ', '+ this.last_name;
    }
    return fullname;
})
module.exports = mongoose.model('User', UserSchema);