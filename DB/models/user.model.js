import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    age: Number,

    phone: Number
    
})
const userModel = mongoose.model('user', userSchema)
export default userModel;