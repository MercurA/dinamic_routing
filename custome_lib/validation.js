const errors = require('./errors');

let validationFn = {
    isString: ( string ) => {
        validRegExp = /^[a-zA-Z][^\\/&%*#@^()+=-_!]*$/;

        if (string.match(validRegExp)) {
            return true;
        }
        return false;
    },
    isValidEmail: ( string ) => {
        validRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

        if ( string.match( validRegExp ) ) {
            return true;
        }
        return false;
    },
    isNumber: ( number ) => !isNaN( parseFloat( number )) && isFinite( number )
};

exports.checkParams = ( validate, req, res, next ) => {
    console.log(validate)
    validate.forEach(element => {

        if ( element.type !== 'body' ) {
            if ( !req.params[element.param] ) {
                 errors.onError('Missing params.');
            }
            element.validation.forEach( valFn => {
                if( element.basicType === "string"){
                    if ( !validationFn[valFn]( req.params[element.param] ) ) {
                        errors.onError('incorect params');
                    }
                } else if(element.basicType === "number"){
                    if ( !validationFn[valFn]( req.params[element.param] ) ) {
                        errors.onError('incorect params');
                    }
                }
            });
        }
    });
    next();
}

// exports.checkBody = (validate,req, res, next) => {
//         validate.forEach( el => {
//             if( el.type !== 'param' ){
//                 if( !Object.keys(req.body) === 0 ){
//                     error.onError('No body found.')
//                 }
//                 el.validation.forEach( valFn => {
//                     if(!validationFn[valFn](req.body))
//                 } )
//             }
//         })
// }