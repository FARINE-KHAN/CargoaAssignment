import mongoose from 'mongoose';

const transporter = mongoose.Schema({

    fullName: String,
    email: String,
    phone: Number,
    address:String,
    password: String,
        
});


const transporterUser = mongoose.model('transporter', transporter);

export default transporterUser;