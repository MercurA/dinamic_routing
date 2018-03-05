const express = require('express');

exports = module.exports = ( settings, routing ) => {
    let app = express(),
        port = settings.http.port;
        host = settings.http.path;

        new routing.JsonRouting(app,false).start();

    return {
        start: ()=>{
            app.listen(port,()=>console.log(`Server is on ${host}:${port}`));
        }
    }
}

exports['@singleton'] = true;
exports['@async'] = false;
exports['@require'] = ['lib/settings','custome_lib/jsonLoader']