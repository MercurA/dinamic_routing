const errors = require('./errors'),
    validator = require('validator');

let validationFn = {
    isEmpty: ( obj )=> Object.keys(obj).length === 0,
    isString: (string) => {
        validRegExp = /^[a-zA-Z][^0-9\\/&%*#@^()+=-_!]*$/;

        if (string.match(validRegExp)) {
            return true;
        }
        return false;
    },
    isValidEmail: ( string ) => {
        validRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

        if ( string.match( validRegExp )) {
            return true;
        }
        return false;
    },
    isNumber: (number) => !isNaN(parseFloat(number)) && isFinite(number),
};

exports.checkParams = (validate, req, res, next) => {
    if (validate instanceof Array) {
        validate.forEach(element => {
            if (element.type !== 'body') {
                if (!req.params[element.param]) {
                    errors.onError('Missing params.');
                }
                element.validation.forEach(valFn => {
                    if (!validationFn[valFn](req.params[element.param])) {
                       res.send(errors.onError('Incorect params'));
                    }
                });
            }
        });
        next();
    } else {
        next();
    }
}

exports.checkBody = ( validate, req, res, next ) => {
    if( validate instanceof Array ){
        validate.forEach( el => {
            if ( el.type !== 'param' ) {
                if ( !Object.keys( req.body ) === 0 ) {
                    error.onError( 'No body found.' );
                }
                el.validation.forEach( valFn => {
                    if ( !validationFn.isEmpty( req.body ) ) {
                        if ( !validationFn[valFn]( req.body[el.param] ) ) {
                            errors.onError( 'Incorect params');
                        }
                    }
                });
            }
        });
        next();
    }else{
        next();
    }
}