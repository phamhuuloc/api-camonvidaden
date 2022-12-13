
const router = require("express").Router();

//import module
const user = require("./user");
const voucher = require("./voucher");
const donation = require("./donation");
const supplier = require("./supplier");
const auth = require("./auth");

//routing
router.use("/auth", auth);
router.use("/user", user);
router.use("/voucher", voucher);
router.use("/donation", donation);
router.use("/supplier", supplier);

module.exports = router;
