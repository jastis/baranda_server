const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const User_instance = require('../../controller/user');

//@route api/user
//@method POST
router.post('/', verifyToken, User_instance.user_create_post );

//@route api/user/login
//@method POST
router.post('/login', User_instance.user_login );

//@route api/user/id
//@method GET
router.get('/:id',verifyToken, User_instance.user_get_single);

//@route api/user/
//@method GET 
router.get('/',verifyToken, User_instance.user_get_all);

//@route api/user/id
//@method PATCH
router.patch('/:id',verifyToken, User_instance.user_update_single);
module.exports = router;