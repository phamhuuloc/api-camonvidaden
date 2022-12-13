const supplierController = require('./supplier.controller.js')
const router = require('express').Router()
const { checkAdminPermission } = require('../../middlewares/authMiddleware');

router.post('/new', checkAdminPermission, supplierController.addSupplier);
router.get('/list', supplierController.getSuppliers);

module.exports = router;