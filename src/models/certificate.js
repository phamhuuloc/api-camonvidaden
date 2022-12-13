const mongoose=require('mongoose')
const Schema=mongoose.Schema

const certificateSchema=new Schema({
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Certificate=mongoose.model('Certificate', certificateSchema);

module.exports=Certificate;