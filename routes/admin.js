const express = require('express');
const router = express.Router();
const path = require('path')
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))

const authentication = require('../middleware/authentication')
const adminController = require('../controllers/admin')

router.get('/admin/add-product', authentication, adminController.getAddProduct);
router.post('/admin/add-product', authentication, adminController.postAddProduct);
router.get('/admin/products/:productid', authentication, adminController.getEditProduct);
router.post('/admin/edit-product', authentication, adminController.postEditProduct);
router.get('/admin/products', authentication, adminController.getProduct);
router.post('/admin/delete-product', authentication, adminController.deleteProduct)


module.exports = router;