const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var User = require("../../models/user");
// const crypto = require("crypto");
// const sendEmail = require('../../../utils/sendEmail');


async function register(body) {
    const email = body.email;
    const password = body.password;
    const fullname = body.fullname;
    const phonenumber = body.phonenumber;
    const cmnd = body.cmnd;
    
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            return {
                error: true,
                message: "Email đã được sử dụng",
            };
        }    
        const newUser = new User({
            email,
            password,
            fullname,
            phonenumber,
            cmnd,
        });
            
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(newUser.password, salt)
        
        if (hash.err) 
            throw err;
                    
        newUser.password = hash;
        
        await newUser.save()
                        
        const _token = jwt.sign({ _id: newUser._id }, "secret");
        return {
            error: false,
            message: "Đăng ký thành công!",
            token: _token,
        };     
    }
    catch(err) {
        return {
            error: true,
            message: err.message
        }
    }
}
async function login(body) {
    const email = body.email;
    const password = body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
        return {
            error: true,
            message: "Tài khoản hoặc mật khẩu không đúng"
        };
        } else {
            const passcmp = await bcrypt.compare(password, user.password);
            if (passcmp) {
                var _token = jwt.sign({ _id: user._id }, "secret");
                if(user.role){
                    return {
                        error: false,
                        message: "Đăng nhập thành công",
                        token: _token,
                        role: user.role,
                    };
                }else{
                    return {
                        error: false,
                        message: "Đăng nhập thành công",
                        token: _token,
                    };
                }
                
            } else {
                return {
                    error: true,
                    message: "Tài khoản hoặc mật khẩu không đúng"
                };
            }
        }
    } catch (err) {
        return {
            error: true,
            message: err.message
        };
    }
}

module.exports= {
    register,
    login
}