const jwt = require('jsonwebtoken');

exports.verifyToken = ( req, res, next ) => {
    let token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token, 'admin', (err,decoded)=>{
            if(err){
                return new Error('Invalid Password');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
       res.status(401).send({success: false, msg: 'Something went wrong'});
    }
}