import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase : true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    //reset pasword
    resetPasswordOTP: {
        type: String,
        default: null,
    },
    resetPasswordExpires: {
        type: Date,
        default : null
    }
},
    {
    timestamps : true
}
)

const User = mongoose.model("User", userSchema)

export default User