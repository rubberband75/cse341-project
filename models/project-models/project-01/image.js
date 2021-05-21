const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    originalname: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer,
    size: Number
});

module.exports = mongoose.model('Image', imageSchema)
