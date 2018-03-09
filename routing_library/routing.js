const fs = require('fs'),
    IoC = require('electrolyte'),
    bodyParser = require('body-parser');

let jsonFile = JSON.parse(fs.readFileSync('./routes.json'));

exports = module.exports = (auth, v, mw) => {

    function setCors() {
        app.use((req, res, next) => {
            let method = req.method && req.method.toUpperCase && req.method.toUpperCase();

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
            if ("OPTIONS" === method)
                res.sendStatus(204).end();
            else
                next();
        });
    }
    function setMddleware(app, cors) {
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        if (cors === true) {
            setCors();
        }
    }
    return {
        
        start(app, cors) {
            setMddleware(app, cors);
            for (let route in jsonFile) {
                let r = jsonFile[route];
                
                app.use('/api/admin/*', auth.verifyToken);

                app[r.method](route,
                    (req, res, next) => { v.checkBody(r.validate, req, res, next) },
                    (req, res, next) => { v.checkParams(r.validate, req, res, next) },
                    IoC.create(r.handler)[r.handlerMethod]);
                app.use(mw.onError);
            }
        }
    }
    
}
exports['@singleton'] = true;
exports['@require'] = ['../lib/authorization', 'routing_library/validation', '../middleware/errors']