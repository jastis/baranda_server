const jwt = require('jsonwebtoken');

const config  = process.env;

const verifyToken  =  ( req, res,next) => {
 const token = req.header("Authorization");

 if(!token){
     return res.status(403).json({message:"Unauthorized access"});
 }

 try {
     const decoded = jwt.verify(token.replace("Bearer ",""),config.TOKEN_KEY);
     req.user = decoded;
 } catch (error) {
     return res.status(401).json({message:"Invalid Token"});
 }

 return next();
}

 module.exports = verifyToken;   
 