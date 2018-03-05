// Exemple of how a json document would look like.
//  {
//     "endpoint" : {
//     	"method": "method",
//         "handler": "address of handler" ex: handler/handler
//         "handlerMethod": "handlers method" ex: insert
//          "validation": Object containing params: true
//     }

const fs = require('fs'),
    IoC = require('electrolyte'),
    bodyParser = require('body-parser'),
    validation = require('./validation');

let jsonDoc = fs.readFileSync('./routes.json'),
    documentJson = JSON.parse(jsonDoc);

class JsonRouting {
    constructor(app, cors) {
        this.app = app;
        this.cors = cors;
        this.route;
        this.setMddleware();
    }
    getObj() {
        for (let route in documentJson) {
            let r = documentJson[route],
                params = r.validate.params;
            this.app.param((params !== null ? params: false), validation.isNumeric);
            this.app[r.method.toLowerCase()](route, IoC.create(r.handler)[r.handlerMethod]);
        }
    }
    setMddleware() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        if (this.cors === true) {
            this.setCors();
        }
    }
    setCors() {
        this.app.use((req, res, next) => {
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
<<<<<<< HEAD
    start(){
        this.getObj();
        
=======
    isNumeric( required,data, req, res, next ){
        if(required && (params != null)){
            let p = req.params[data];
            if (Number.isFinite(p) && Number.isInteger(p) && !Number.isNaN(p)) {
                return next();
            }
            res.status(500).send({ success: false, msg: "Invalid parameter" });
        }
        return;
>>>>>>> 96e89aec452eb23d269f2afa36912becd2c49000
    }
start(){
    this.getObj();
}
}
exports.JsonRouting = JsonRouting;
