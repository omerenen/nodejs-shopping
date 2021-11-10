const express = require('express');
const router = express.Router();
const path = require('path');

const shopController = require('../controllers/shop')
const authentication = require('../middleware/authentication')
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productid', shopController.getProduct);
router.get('/categories/:categoryid', shopController.getProductsByCategoryId);
router.get('/cart', authentication, shopController.getCart);
router.post('/cart', authentication, shopController.postCart)
router.post('/delete-cartitem', authentication, shopController.deletePostCartItem)
router.post('/clear-orders', authentication, shopController.deletePostOrders)
router.get('/orders', authentication, shopController.getOrders);
router.post('/create-order', authentication, shopController.postOrder)


module.exports = router;