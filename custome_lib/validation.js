const errors    = require('./errors'),
    validator   = require('validator');
    
let validationFn = {
    isEmpty: (obj) => Object.keys(obj).length === 0,
    isValidEmail: validator.isEmail,
    isNumber: validator.isNumeric,
    // isPassword: validate.isPassword,
    isString: (string) => {
        validRegExp = /^[a-zA-Z][^0-9\\/&%*#@^()+=-_!]*$/;

        if (string.match(validRegExp)) {
            return true;
        }
        return false;
    },
};

exports.checkParams = ( validate, req, res, next ) => {
    if ( validate instanceof Array ) {
        validate.forEach( el => {
            if ( el.type !== 'body' ) {
                if ( !req.params[el.param] ) {
                    errors.onError( 'Missing params.' );
                }
                el.validation.forEach( valFn => {
                    console.log(req.params[el.param])
                    if ( !validationFn[valFn]( req.params[el.param] )) {
                        errors.onError( 'Incorect params' );
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
    if ( validate instanceof Array ) {
        validate.forEach( el => {
            if (el.type !== 'param') {
                if ( !Object.keys(req.body) === 0 ) {
                    error.onError( 'No body found.' );
                }
                el.validation.forEach( valFn => {
                    if ( !validationFn.isEmpty( req.body ) ) {
                        if ( !validationFn[valFn]( req.body[el.param] )) {
                            errors.onError( 'Incorect params' );
                        }
                    }
                });
            }
        });
        next();
    } else {
        next();
    }
}