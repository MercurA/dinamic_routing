const fs = require('fs'),
    IoC = require('electrolyte'),
    bodyParser = require('body-parser');

let jsonDoc = fs.readFileSync('./routes.json'),
    documentJson = JSON.parse(jsonDoc);
    class JsonRouting{
        constructor( app, cors){
            this.app = app;
            this.cors = cors;
            this.route;
            this.method;
            this.endPoint;
            this.handler;
            this.setMddleware();
        }
    getObj(){
        for( let route in documentJson ){
            this.route = route;
            this.method = documentJson[route].method.toLowerCase();
            this.handler = documentJson[route].handler;
            this.add(this.route,this.method,this.handler);
        }
    }
    add(route,method,handler){
        switch(route){
            case '/api':
                this.app[method](route,IoC.create(handler).list)
                break;
            case '/api/post':
                this.app[method](route,IoC.create(handler).insert);
                break;
            default:
                console.log('No routes');
        }
    }
    setMddleware(){
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        if(this.cors === true){
            this.setCors();
        }
    }
    setCors(){
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
    start(){
        this.getObj();
    }
}
exports.JsonRouting = JsonRouting;