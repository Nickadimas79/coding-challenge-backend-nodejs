const mongoose = require('mongoose');


const reportSchema = mongoose.Schema({
    status: String,
    officer: String,
    licenseNum: String,
    color: String,
    type: String,
    date: String,
    name: String,
    description: String
});


module.exports = mongoose.model('Report', reportSchema);
