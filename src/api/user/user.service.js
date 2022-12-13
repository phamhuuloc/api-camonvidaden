var User = require("../../models/user");
var Donation = require("../../models/donation");
var Voucher = require("../../models/voucher");
const pdf = require('html-pdf');
const Certificate = require("../../models/certificate");
const pdfTemplate = require('./documents/index.js');
const Vnpay = require("../../models/vnpay");
const {
    ref,
    uploadString,
    getDownloadURL,
} = require ("firebase/storage");
const storage = require('../../../firebase');
const { v4 } = require("uuid");


async function getVoucher(userId){
    try {
        let user = await User.findById(userId);
        if(!user){    
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }

        let vouchersList = user.vouchers_list;

        return {
            error: false,
            message: "Lấy danh sách quyên góp thành công",
            vouchersList,
        }
    }
    catch(err) {
        return {   
            error: true,
            message: err.message,
        }
    }
}

async function postVoucher(userId, voucher_id){
    try {
        let user = await User.findById(userId);
        let voucher = await Voucher.findOne({ _id: voucher_id })
        if(!user) { 
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }

        if(!voucher) {
            return {
                error: true,
                message: 'Không tìm thấy voucher'
            }
        }

        if(user.point < voucher.point_cost){
            return {
                error: true,
                message: 'Không đủ điểm để đổi lấy voucher'
            }
        }

        if(voucher.voucher_code.length <= 0){
            return {
                error: true,
                message: 'Voucher đã hết số lượng'
            }
        }

        let oldVoucherCodes = voucher.voucher_code;
        let voucherCode = oldVoucherCodes[0];
        oldVoucherCodes.shift();

            let oldVouchers = user.vouchers_list;
            let newVouchers =[];
            for(let i = 0; i < oldVouchers.length; i++)                    
            {
                newVouchers.push(oldVouchers[i]);
            }
            newVouchers.push({
                voucher_code: voucherCode,
                descripion: voucher.descripion,
                category: voucher.category,
                supplier_name: voucher.supplier_name,
                point_cost: voucher.point_cost,
                image: voucher.image
            });
            
            voucher.voucher_code = oldVoucherCodes;
            user.vouchers_list = newVouchers;

            user.point -= voucher.point_cost;
            await voucher.save()
            await user.save()

        return {
            error: false,
            message: "Thêm voucher thành công"
        }
    }   

    catch(err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function postMoney(userId, money){
    try {
        let user = await User.findById(userId);
        if(!user) { 
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }
            user.wallet_balance += money;
            await user.save()

        return {
            error: false,
            message: "Nạp tiền thành công"
        }
    }   

    catch(err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getDonation(userId){
    try {
        let user = await User.findById(userId);

        let donationList = await Donation.find({user_id: userId});
        if(!user){    
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }

        return {
            error: false,
            message: "Lấy danh sách quyên góp thành công",
            donationList,
        }
    }
    catch(err) {
        return {   
            error: true,
            message: err.message,
        }
    }
}

async function postDonation(userId, reqDonation){
    try {
        let user = await User.findOne({ _id: userId });
        // if(!user) {  //nếu chưa có userId thì lưu vào
        //     return {
        //         error: true,
        //         message: 'Không tìm thấy người dùng'
        //     }
        // }  
        // else {
        //     let oldDonations = user.donations_list;
        //     let newDonations = [];
        //     for(let i = 0; i < oldDonations.length; i++)                    
        //     {
        //         newDonations.push(oldDonations[i]);
        //     }
        //     newDonations.push(reqDonation);
        //     user.donations_list = newDonations;
        //     if(reqDonation.type_of_donation === "0"){
        //         user.point += Math.floor(reqDonation.money/1000);
        //     }
        //     if(reqDonation.type_of_donation === "1"){
        //         user.point += reqDonation.clothes_amount * 10;
        //     }

        //     await user.save()
        

        const type_of_donation = reqDonation.type_of_donation;
        const money = reqDonation.money;
        const clothes_amount = reqDonation.clothes_amount;
        const address = reqDonation.address;
        const card_id = reqDonation.card_id;

        let point = 0;

        
        if(type_of_donation !== "1" && type_of_donation !== "2"){
            return {
                error: true,
                message: "Lỗi loại quyên góp"
            }
        }

        if(type_of_donation === "1"){
            if(user.wallet_balance < money){
                return {
                    error: true,
                    message: "Không đủ tiền để thực hiện giao dịch"
                }
            }
            user.wallet_balance -= money;
            point += Math.floor(money/1000);
            user.point += point;
        }

        if(type_of_donation === "2"){
            return {
                error: false,
                message: "Vui lòng chờ nhân viên đến địa chỉ để nhận quyên góp để nhận số điểm"
            }
        }

        const newDonation = new Donation({
            user_id: userId,
            type_of_donation,
            money,
            clothes_amount,
            address,
            total_point: point,
            card_id
        });

        let width = 885, height = 626;

        const getCerti = () => {
            return new Promise((resolve, reject) => {
                pdf.create(pdfTemplate(user.fullname, money), {
                        border: '0px',
                        type: "png",      
                        quality: "75",
                }).toBuffer(function(err, buffer){
                    const bufferToBase64 = Buffer.from(buffer).toString('base64')
                    const imageRef = ref(storage, `certificate/${v4()}.png`);
                    uploadString(imageRef, bufferToBase64, 'base64').then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            resolve(url)
                        });
                    });
                })
            })
        }

        const certificate = await getCerti();

        const newCertificate = new Certificate({
            image: certificate
        });

        

        const getCertificateId = () => {
            return new Promise((resolve, reject) => {
                newCertificate.save(function(err, certificate){
                    const id = certificate._id
                    resolve(id);
                });
            })
        }

        const certificateId = await getCertificateId();

        newDonation.save();
        user.save();
          
        return {
            error: false,
            message: "Quyên góp thành công, chia sẻ để nhận thêm điểm",
            certificate: certificate,
            certificateId: certificateId
        }
    }   

    catch(err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getUser(userId) {
    try {
        const user = await User.findById(userId)
        if(!user)
        {
            return {
                error: true,
                message: "Khong tim thay user"
            }
        }

        if(user.role == "admin"){
            return {
                error: false,
                message: "Tim thay user",
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
                phonenumber: user.phonenumber,
                cmnd: user.cmnd,
                wallet_balance: user.wallet_balance,
                point: user.point,
                vouchers_list: user.vouchers_list,
                role: user.role
            }
        }
        
        return {
            error: false,
            message: "Tim thay user",
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            phonenumber: user.phonenumber,
            cmnd: user.cmnd,
            wallet_balance: user.wallet_balance,
            point: user.point,
            vouchers_list: user.vouchers_list,
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function updateUser(userId, reqUserInfo) {
    try {
        const email = reqUserInfo.email;
        const fullname = reqUserInfo.fullname;
        const phonenumber = reqUserInfo.phonenumber;
        const cmnd = reqUserInfo.cmnd;

        const user = await User.findById(userId)
        if(!user)
        {
            return {
                error: true,
                message: "Khong tim thay user"
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {
                email: email,
                fullname: fullname,
                phonenumber: phonenumber,
                cmnd: cmnd
            }, 
        )
        
        return {
            error: false,
            message: "Update thành công user",
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}


async function getCertificate(cerId) {
    try {

        const certificate = await Certificate.findById(cerId)
        if(!cerId)
        {
            return {
                error: true,
                message: "Khong tim thay chung chi"
            }
        }
        
        return {
            error: false,
            message: "Lay chung chi thành công",
            certificate: certificate
        }
    }

    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function vnpayPayment(req) {
    try {
        var ipAddr = '127.0.0.1'
        var tmnCode = 'XCGAYSB8';
        var secretKey = 'VRTQFJVDDZKRPJPNGKOEFLRDUYGQCWOG';
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        var returnUrl = encodeURIComponent('https://camonvidaden-cba2d.web.app/donepayment');

        var date = new Date();

        var dateFormat = require('dateformat');

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = req.body.amount;
        
        var orderInfo = encodeURIComponent(req.body.orderDescription);
        var orderType = req.body.orderType;
        var locale = req.body.language;
        if(locale === null || locale === ''){
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params_old = {};
        vnp_Params_old['vnp_Version'] = '2.1.0';
        vnp_Params_old['vnp_Command'] = 'pay';
        vnp_Params_old['vnp_TmnCode'] = tmnCode;
        // vnp_Params_old['vnp_Merchant'] = ''
        vnp_Params_old['vnp_Locale'] = locale;
        vnp_Params_old['vnp_CurrCode'] = currCode;
        vnp_Params_old['vnp_TxnRef'] = orderId;
        vnp_Params_old['vnp_OrderInfo'] = orderInfo;
        vnp_Params_old['vnp_OrderType'] = orderType;
        vnp_Params_old['vnp_Amount'] = amount * 100;
        vnp_Params_old['vnp_ReturnUrl'] = returnUrl;
        vnp_Params_old['vnp_IpAddr'] = ipAddr;
        vnp_Params_old['vnp_CreateDate'] = createDate;
        // if(bankCode !== null && bankCode !== ''){
        //     vnp_Params_old['vnp_BankCode'] = bankCode;
        // }

        const vnp_Params = Object.keys(vnp_Params_old).sort().reduce(
            (obj, key) => { 
              obj[key] = vnp_Params_old[key]; 
              return obj;
            }, 
            {}
        );

        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        console.log(vnp_Params)

        console.log(vnpUrl)

        return {
            err: false,
            message: 'Chuyển hướng thanh toán',
            vnpayUrl: vnpUrl,
        }
    }

    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function vnpayIpn(userId, req) {
    try {
        var vnp_Params_old = req.body;
        var secureHash = vnp_Params_old['vnp_SecureHash'];

        delete vnp_Params_old['vnp_SecureHash'];

        const vnp_Params = Object.keys(vnp_Params_old).sort().reduce(
            (obj, key) => { 
              obj[key] = vnp_Params_old[key]; 
              return obj;
            }, 
            {}
        );

        var secretKey = 'VRTQFJVDDZKRPJPNGKOEFLRDUYGQCWOG';
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
        

        if(secureHash === signed){
            const transactionNo = vnp_Params['vnp_TransactionNo']
            const vnpay = await Vnpay.findOne({ vnp_TransactionNo: transactionNo })

            if(!vnpay){
                const user = await User.findById(userId)

                var orderId = vnp_Params['vnp_TxnRef'];
                var rspCode = vnp_Params['vnp_ResponseCode'];
                var money = vnp_Params['vnp_Amount']

                user.wallet_balance += parseInt(money)/100;

                const newVnpay = new Vnpay({
                    vnp_Amount: vnp_Params['vnp_Amount'],
                    vnp_BankCode: vnp_Params['vnp_BankCode'],
                    vnp_BankTranNo: vnp_Params['vnp_BankTranNo'],
                    vnp_CardType: vnp_Params['vnp_CardType'],
                    vnp_OrderInfo: vnp_Params['vnp_OrderInfo'],
                    vnp_TransactionNo: vnp_Params['vnp_TransactionNo'],
                    vnp_TmnCode: vnp_Params['vnp_TmnCode'],
                    vnp_PayDate: vnp_Params['vnp_PayDate']
                });

                newVnpay.save();
                user.save();

                return {
                    error: false,
                    message: "Thanh toán thành công",
                    paymentInfo: {
                        vnp_Amount: parseInt(vnp_Params['vnp_Amount'])/100,
                        vnp_BankCode: vnp_Params['vnp_BankCode'],
                        vnp_BankTranNo: vnp_Params['vnp_BankTranNo'],
                        vnp_CardType: vnp_Params['vnp_CardType'],
                        vnp_OrderInfo: vnp_Params['vnp_OrderInfo'],
                        vnp_PayDate: vnp_Params['vnp_PayDate']
                    },
                    userInfo:{
                        name: user.fullname,
                        email: user.email
                    }
                }

            } else {
                return {
                    error: true,
                    message: "Giao dịch đã được xử lí"
                }
            }
            
            
        }
        else {
            return {
                error: true,
                message: "Lỗi checksum"
            }
        }
    }

    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}



module.exports= {
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

