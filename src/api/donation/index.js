const donationController = require('./donation.controller.js')
const router = require('express').Router()

router.get('/list/top', donationController.getTopDonations);
router.get('/list/', donationController.getDonations);

module.exports = router;