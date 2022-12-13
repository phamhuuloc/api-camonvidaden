const mongoose=require('mongoose')
const Schema=mongoose.Schema

const donationSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',                        
        required: true
    },
    type_of_donation: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
        required: true,
    },
    clothes_amount: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    card_id: {
        type: String,
        required: true
    },
    total_point: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Donation=mongoose.model('Donation', donationSchema);

module.exports=Donation;