const mongoose = require('mongoose');


const officerSchema = mongoose.Schema({
    name: String,
    badgeNum: String,
    status: String
});


module.exports = mongoose.model('Officer', officerSchema);
