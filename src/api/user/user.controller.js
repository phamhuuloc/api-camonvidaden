const userService = require('./user.service')
const ErrorResponse = require("../../../utils/errorResponse");

//[GET] api/user/donation
async function getDonation (req, res, next) {
    try {
        let DTO=await userService.getDonation(req.userId);
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

//[POST] api/user/donation
async function postDonation (req, res, next) {
    try {
        let DTO=await userService.postDonation(req.userId, req.body);
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

//[GET] api/user/donation
async function getVoucher (req, res, next) {
    try {
        let DTO=await userService.getVoucher(req.userId);
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

//[POST] api/user/donation
async function postVoucher (req, res, next) {
    try {
        let DTO=await userService.postVoucher(req.userId, req.body.voucher_id);
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

//[POST] api/user/donation
async function postMoney (req, res, next) {
    try {
        let DTO=await userService.postMoney(req.userId, req.body.money);
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

//[GET] api/user/
async function getUser (req, res, next) {
    try {
        let DTO=await userService.getUser(req.userId);
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

async function updateUser (req, res, next) {
    try {
        let DTO=await userService.updateUser(req.userId, req.body);
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

async function getCertificate (req, res, next) {
    try {
        let DTO=await userService.getCertificate(req.params.id);
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

async function vnpayPayment(req, res, next) {
    try {
        let DTO=await userService.vnpayPayment(req);
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

async function vnpayIpn(req, res, next) {
    try {
        let DTO=await userService.vnpayIpn(req.userId, req);
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
    getVoucher,
    postVoucher,
    getDonation,
    postDonation,
    getUser,
    updateUser,
    postMoney,
    getCertificate,
    vnpayPayment,
    vnpayIpn
}