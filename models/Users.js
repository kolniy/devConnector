const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },
    avatar: {
        type: String
    },
    Date:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User