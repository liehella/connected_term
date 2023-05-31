
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    _id: Schema.Types.ObjectId ,
    url: String ,
    type: String
});
const Urls = mongoose.model('Video', urlSchema);
module.exports = Urls

