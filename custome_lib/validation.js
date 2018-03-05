class Validation {
    isNumeric(param,by,err, req, res, next ){
        if(param){
            console.log(req.params[by])
            let p = req.params.by;
            !isNaN(parseFloat(p)) && isFinite(p) ? next() : next(err)  
        } 
    }
}

exports.Validation = Validation;