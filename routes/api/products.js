const express = require('express');
const router  = express.Router();
const verifyToken = require('../../middleware/auth')
const product = require('../../controller/products');

router.post('/', verifyToken, product.product_create);
router.patch('/:id', verifyToken, product.product_update);
router.delete('/:id', verifyToken, product.product_delete);
router.delete('/', verifyToken, product.product_delete_many);
router.get('/', verifyToken, product.product_list_all);
router.get('/:id', verifyToken, product.product_list_single);
router.get('/search/:search_terms', verifyToken, product.product_search);
module.exports = router;