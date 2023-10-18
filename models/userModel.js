const mongoose = require('mongoose')
const { Schema, model} = mongoose
const bcrypt = require('bcrypt')

const userModel = new Schema({
    firstname: {
        type: String,
        required: true,
        index: true
    },
    lastname: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, 
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: []
    },
    address: [{type: Schema.Types.ObjectId, ref: "Address"}],
    wishlist: [{type: Schema.Types.ObjectId, ref: "Product"}]
},{timestamps: true})

userModel.pre("save", async function(next){
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userModel.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
const User = model('User', userModel)
module.exports = User