const fs        = require('fs'),
    IoC         = require('electrolyte'),
    bodyParser  = require('body-parser'),
    auth        = require('./authorization');
    
    
let v           = require('./validation');
let jsonDoc     = fs.readFileSync( './routes.json' ),
   documentJson = JSON.parse( jsonDoc );

class Routing {
    constructor( app, cors ) {
        this.app    = app;
        this.cors   = cors;
        this.route;
        this.setMddleware();
    }
    getObj( ) {
        for ( let route in documentJson ) {
            let r = documentJson[route];
            console.log(route)      
            this.app.use( '/api/admin/*', auth.verifyToken );
            this.app[r.method.toLowerCase()]( route,
                (req,res,next)=>{ v.checkParams( r.validate,req,res,next )},
                // v.checkBody,
                IoC.create(r.handler)[r.handlerMethod]);
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
exports.Routing = Routing;