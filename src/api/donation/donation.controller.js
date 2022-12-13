const donationService = require('./donation.service')
const ErrorResponse = require("../../../utils/errorResponse");

//[GET] api/user/donation
async function getDonations (req, res, next) {
    try {
        let DTO=await donationService.getDonations(req.query.page);
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

async function getTopDonations (req, res, next) {
    try {
        let DTO=await donationService.getTopDonations();
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
    getDonations,
    getTopDonations,
}