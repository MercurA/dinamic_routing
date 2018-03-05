const mongoose = require('mongoose');

exports = module.exports = (schema)=>{
    let MongoDB = 'mongodb://Admin:admin@ds249718.mlab.com:49718/api_testing';
    mongoose.connect(MongoDB);
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;

    db.on('error', console.log.bind(console,'Mongo is not connected'))
    .once('open',console.log.bind(console,'Mongo is connected'));
    
    let Model = mongoose.model('Data',schema);
    return {
        insert: async (doc)=>{
            let model = new Model(doc)
            return await model.save(doc);
        },
        findAll: async ()=>{
            return await Model.find({});
        },
        findByAge: async (age)=>{
            return await Model.find({age:age})
        }
    }
}

exports['@singleton'] = true;
exports['@async'] = false
exports['@require'] = ['lib/schema']