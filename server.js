const express = require("express");
require("dotenv").config();
//connect Mongoose
require("./config/database").connect();



const app = express();

//BodyParser Middleware
app.use(express.json());

//set static file location
app.use(express.static(`${__dirname}/public`));

//Set Route
const requestRoute = require('./routes/api/request');
const userRoute = require('./routes/api/user');
const productRoute = require('./routes/api/products');


app.use('/api/v1/request', requestRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/products',productRoute);


const PORT = process.env.API_PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on PORT: ${PORT}`));
