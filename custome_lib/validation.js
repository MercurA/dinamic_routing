exports.checkParams = ( req, res, next ) => {
    function getParam(){
        for(let i of Object.keys(req.params)){
            return i;
        }
    }
    let p = getParam();
    if(req.params[p] !== undefined ){
        if(isNumber(req.params[p] * 1)){
            next();
        } else {
            res.send({ success: false, msg: 'Invalid parameters found.' });
        }
    } else {
        next();
    }
}
exports.checkBody = ( req, res, next ) => {
    let body = req.body;

    if( Object.keys(body).length !== 0 ){
        if(isString(body.name) && isNumber(body.age) && isString(body.location) && isValidEmail(body.email)){
            next();
        } else {
            res.send({success: false, msg: 'Invalid parameters found.'});
        }
    } else {
        next();
    }
}
function isString( string ) {
    validRegExp = /^[a-zA-Z][^\\/&%*#@^()+=-_!]*$/
    
    if (string.match(validRegExp)) {
        return true;
    }
    return false;
}
function isValidEmail( string ) {
    validRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    
    if ( string.match( validRegExp ) ) {
        return true;
    }
    return false;
}
function isNumber( number ) {
    let n = parseFloat( number )
    if ( Number.isFinite( n ) && Number.isInteger( n ) && !Number.isNaN( n ) ) {
        return true;
    }
    return false;
}