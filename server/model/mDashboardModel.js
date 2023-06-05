import mongoose from 'mongoose';

const mDashboard = mongoose.Schema({

    orderId: String,
    to: String,
    from: String,
    quantity:{type:Number,enum:[1,2,3]},
    address: String,
    transporter: String,
    price: {type : Number, default : 0},
        
});

const manufacturer = mongoose.model('mDashboard', mDashboard);

export default manufacturer;