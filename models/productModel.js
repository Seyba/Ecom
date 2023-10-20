const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowerCase: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category: {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: "Category",
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0,
    }, 
    images: {
        type: Array,
    },
    color: {
        type: String, 
        required: true
    },
    ratings: [{
        star: Number,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }]
}, {timestamps: true});

//* to hide a schema document set {select: false}
//Export the model
module.exports = mongoose.model('Product', productSchema);