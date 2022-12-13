var Donation = require("../../models/donation");
var User = require("../../models/user");


async function getDonations(page){
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Donation.countDocuments();
        const donationsQuery = await Donation.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        let donations = [];
        
        for(let i = 0; i < donationsQuery.length; i++)                    
        {
            const user_id = donationsQuery[i]._id;
            const user = await User.findById(user_id);
            donations.push({
                ...donationsQuery[i]._doc,
                user: {
                    _id: user._id,
                    email: user.email,
                    fullname: user.fullname,
                    phonenumber: user.phonenumber,
                },
            });
        }

        return {
            error: false,
            message: `Lấy donations trang ${page} thành công`,
            current_page: Number(page),
            number_of_pages: Math.ceil(total / LIMIT),
            donations    
        }
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getTopDonations(){
    try {
        const year = new Date().getFullYear();
        const month = ("0" + (new Date().getMonth() + 1)).slice(-2);

        const topDonationsQueryByYear = await Donation.aggregate([
            {
                $match : { "createdAt": { $gte: new Date(`${year}-01-01T00:00:00.000+07:00`), $lt: new Date(`${year}-12-31T00:00:00.000+07:00`) } }
            },
            {
                $group:
                {
                    _id: "$user_id",
                    total_point: { $sum: "$total_point" },
                },
            },
            {
                $sort : { total_point: -1 }
            }
        ])

        let topDonationsYear = [];

        for(let i = 0; i < topDonationsQueryByYear.length; i++)                    
        {
            const user_id = topDonationsQueryByYear[i]._id;
            const user = await User.findById(user_id);
            topDonationsYear.push({
                user: {
                    _id: user._id,
                    email: user.email,
                    fullname: user.fullname,
                },
                total_point: topDonationsQueryByYear[i].total_point
            });
        }

        const topDonationsQueryByMonth = await Donation.aggregate([
            {
                $match : { "createdAt": { $gte: new Date(`${year}-${month}-01T00:00:00.000+07:00`), $lt: new Date(`${year}-${month}-31T00:00:00.000+07:00`) } }
            },
            {
                $group:
                {
                    _id: "$user_id",
                    total_point: { $sum: "$total_point" },
                },
            },
            {
                $sort : { total_point: -1 }
            }
        ])

        let topDonationsMonth = [];

        for(let i = 0; i < topDonationsQueryByMonth.length; i++)                    
        {
            const user_id = topDonationsQueryByMonth[i]._id;
            const user = await User.findById(user_id);
            topDonationsMonth.push({
                user: {
                    user_id: user._id,
                    email: user.email,
                    fullname: user.fullname,
                },
                total_point: topDonationsQueryByMonth[i].total_point
            });
        }

        
       
        return {
            error: false,
            message: `Lấy top donations thành công`,
            topDonationsYear: topDonationsYear,
            topDonationsMonth: topDonationsMonth
        };
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

module.exports = {
    getDonations,
    getTopDonations
}