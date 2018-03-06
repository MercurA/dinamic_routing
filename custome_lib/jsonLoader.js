const fs        = require('fs'),
    IoC         = require('electrolyte'),
    bodyParser  = require('body-parser'),
    v           = require('./validation'),
    auth        = require('./authorization');

let jsonDoc     = fs.readFileSync( './routes.json' ),
   documentJson = JSON.parse( jsonDoc );

class JsonRouting {
    constructor( app, cors ) {
        this.app    = app;
        this.cors   = cors;
        this.route;
        this.setMddleware();
    }
    getObj( ) {
        for ( let route in documentJson ) {
            let r = documentJson[route];
            this.app.use( '/api/admin/*', auth.verifyToken );
            this.app[r.method.toLowerCase()]( route, v.checkParams,v.checkBody, IoC.create(r.handler)[r.handlerMethod]);
        }        
    }
    setMddleware( ) {
        this.app.use( bodyParser.urlencoded({ extended: false }));
        this.app.use( bodyParser.json( ) );
        if ( this.cors === true ) {
            this.setCors( );
        }
    }
    setCors() {
        this.app.use(( req, res, next ) => {
            let method = req.method && req.method.toUpperCase && req.method.toUpperCase();

            res.header( "Access-Control-Allow-Origin", "*" );
            res.header( "Access-Control-Allow-Credentials", "true" );
            res.header( "Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE" );
            res.header( "Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With" );
            if ( "OPTIONS" === method )
                res.sendStatus( 204 ).end( );
            else
                next( );
        });
    }
    start( ) {
        this.getObj( );
    }
}
exports.JsonRouting = JsonRouting;