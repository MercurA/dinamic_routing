exports = module.exports = ()=>{
    let settings = {
        http: {
            path: 'localhost',
            port: process.env.PORT || 3000
        }
    }
    return settings;
}

exports['@singleton'] = true;
exports['@async'] = false;