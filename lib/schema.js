const mongoose = require('mongoose');

exports = module.exports = ()=>{
    return Schema = mongoose.Schema({
        name : String,
        title: String,
    });
}

exports['@singleton'] = true;
exports['@async'] = false
exports['@require'] = []