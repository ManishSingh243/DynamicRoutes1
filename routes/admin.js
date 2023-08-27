const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/products => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

// deleteProduct => Delete
router.post('/edit-product', adminController.postEditProduct);

// deleteProduct => Delete
router.post('/delete-product', adminController.deleteProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
