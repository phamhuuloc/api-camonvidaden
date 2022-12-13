const supplierService = require('./supplier.service')
const ErrorResponse = require("../../../utils/errorResponse");

//[GET] api/user/donation
async function addSupplier (req, res, next) {
    try {
        let DTO=await supplierService.addSupplier(req.body);
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

async function getSuppliers (req, res, next) {
    try {
        let DTO=await supplierService.getSuppliers(req.query.page);
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
    addSupplier,
    getSuppliers
}