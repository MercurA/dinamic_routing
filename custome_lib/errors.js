exports.onError = (err, req, res, next )=>{
    console.log(`Error: ${err}`);
    return {success: false, data: err};
},
exports.onJsonError = (err,req,res,next)=>{
    console.error(err.message);
}