import mongoose from 'mongoose';

const manufacturer = mongoose.Schema({

    fullName: String,
    email: String,
    phone: Number,
    address:String,
    password: String,
        
});


const manufacturerUser = mongoose.model('manufacturer', manufacturer);

export default manufacturerUser;