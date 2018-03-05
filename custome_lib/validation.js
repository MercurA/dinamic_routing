// const v = require('./lib/validator');

exports.isNumeric = function(req, res, next){
        let p = req.params[0];

        if (Number.isFinite(p) && Number.isInteger(p) && !Number.isNaN(p)) {
            next();
        }
        res.status(500).send({ success: false, msg: "Invalid parameter" });
}
// exports.Valid = function(req,res,next){
//     let body = req.body;
//     for(let i in body ){
//         if(typeof body[i] === 'string' ){

//         }
//     }
    
// }