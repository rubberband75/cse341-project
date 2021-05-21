const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    tags: [{
        type: String
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    },
})

module.exports = mongoose.model('Product', productSchema)
