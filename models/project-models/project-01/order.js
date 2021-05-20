const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        productData: { type: Object, required: true },
        quantity: { type: Number, required: true }
    }],
    user: {
        name: { type: String, required: false },
        email: { type: String, required: false },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    date: { type: Date, required: true, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema)
