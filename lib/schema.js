const mongoose = require('mongoose');

exports = module.exports = ()=>{
    return Schema = mongoose.Schema({
        name : {
            type: String,
            required: true
        },
        title: String,
    })
}

exports['@singleton'] = true;
exports['@async'] = false
exports['@require'] = []