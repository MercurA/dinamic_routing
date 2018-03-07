const errors = require('./errors'),
    validator = require('validator');

let validationFn = {
    isEmpty: (obj) => Object.keys(obj).length === 0,
    isValidEmail: validator.isEmail,
    isNumber: validator.isNumeric,
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
                    if ( !validationFn[valFn]( req.params[el.param] )) {
                        console.log("1")
                        res.send(errors.onError( 'Incorect params' ));
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
                            res.send(errors.onError( 'Incorect params' ));
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