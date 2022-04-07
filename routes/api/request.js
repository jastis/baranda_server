const express = require('express');
const router = express.Router();

const requestdb = require('../../models/Requests');
 
router.post('/',async(req,res)=>{
    const newRequest = new requestdb(req.body);
    try {
        const post = await newRequest.save();
        if (!post) throw Error('something went wrong');

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;