const mongoose = require('mongoose');
const {MONGO_URI} = process.env;

exports.connect = ()=>{
mongoose.connect(MONGO_URI)
.then (() => {
    console.log('Database Connected');
})
.catch((error)=>{
    console.error(error);
    process.exit(1);
});
};
