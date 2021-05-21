const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: { type: String, required: false, default: '' },
    desc: { type: String, required: false, default: '' },
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Image', imageSchema)
