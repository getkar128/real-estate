import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User