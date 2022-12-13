const voucherService = require('./voucher.service')
const ErrorResponse = require("../../../utils/errorResponse");

//[GET] api/user/donation
async function addVoucher (req, res, next) {
    try {
        let DTO=await voucherService.addVoucher(req.body);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function addVoucherCode (req, res, next) {
    try {
        let DTO=await voucherService.addVoucherCode(req.body.voucherCode, req.body.voucherId);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function getVouchersBySearch (req, res, next) {
    try {
        let DTO=await voucherService.getVouchersBySearch(req.query.searchKey);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function getVouchersByCategory (req, res, next) {
    try {
        let DTO=await voucherService.getVouchersByCategory(req.params.category);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function getVouchers (req, res, next) {
    try {
        let DTO=await voucherService.getVouchers(req.query.page);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function getVoucher (req, res, next) {
    try {
        let DTO=await voucherService.getVoucher(req.params.id);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function updateVoucher (req, res, next) {
    try {
        let DTO=await voucherService.updateVoucher(req.params.id, req.body);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function deleteVoucher (req, res, next) {
    try {
        let DTO=await voucherService.deleteVoucher(req.params.id);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

module.exports = {
    addVoucher,
    getVouchers,
    addVoucherCode,
    getVouchersBySearch,
    getVouchersByCategory,
    getVoucher,
    updateVoucher,
    deleteVoucher
}