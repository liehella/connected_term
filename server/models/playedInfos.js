
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playedInfoSchema = new Schema({
    url: String,
    type: String,
    width: Number,
    height: Number,
    bitrate: Number,
    time: Date
});
const playedInfos = mongoose.model('PlayedInfo', playedInfoSchema);
module.exports = playedInfos;

