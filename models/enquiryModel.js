const mongoose = require('mongoose')
const { Schema, model } = mongoose

const enquirySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },

}, {timestamps: true})

const Enquiry = model('Enquiry', enquirySchema)
module.exports = Enquiry