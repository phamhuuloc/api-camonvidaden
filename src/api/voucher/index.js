const voucherController = require('./voucher.controller.js')
const router = require('express').Router()
const { checkAdminPermission } = require('../../middlewares/authMiddleware');


router.get('/search', voucherController.getVouchersBySearch);
router.get('/category/:category', voucherController.getVouchersByCategory);
router.get('/list', voucherController.getVouchers)
router.post('/new', checkAdminPermission, voucherController.addVoucher)
router.post('/newcode', checkAdminPermission, voucherController.addVoucherCode)
router.get('/edit/:id', checkAdminPermission, voucherController.getVoucher)
router.post('/edit/:id', checkAdminPermission, voucherController.updateVoucher)
router.delete('/delete/:id', checkAdminPermission, voucherController.deleteVoucher)

module.exports = router;