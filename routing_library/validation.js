const validator = require('validator');

let validationFn = {
    isEmpty: (obj) => Object.keys(obj).length === 0,
    isValidEmail: validator.isEmail,
    isNumber: validator.isNumeric,
    isString: (string) => {
        validRegExp = /^[a-zA-Z][^\\/&%*#@^()+=-_!]*$/;

        if (string.match(validRegExp)) {
            return true;
        }
        return false;
    },
};

exports = module.exports = (mw) => {
    return {
        checkBody: (validate, req, res, next) => {
            if (validate instanceof Array) {
                validate.forEach(el => {
                    if (el.type !== 'param') {
                        console.log(req.body)
                        if (!req.body[el.param]) {
                            let err = new Error()
                            err.status = 500
                            next(err);
                        }
                        el.validation.forEach(valFn => {
                            if (!validationFn.isEmpty(req.body)) {
                                if (!validationFn[valFn](req.body[el.param])) {
                                    let err = new Error()
                                    err.status = 500
                                    next(err);
                                }
                            }
                        });
                    }
                });
                next();
            } else {
                next();
            }
        },
        checkParams: (validate, req, res, next) => {
            if (validate instanceof Array) {
                validate.forEach(el => {
                    if (el.type !== 'body') {
                        if (!req.params[el.param]) {
                            next('Missing params.');
                        }
                        el.validation.forEach(valFn => {
                            if (!validationFn[valFn](req.params[el.param])) {
                                let err = new Error()
                                err.status = 500
                                next(err);
                            }
                        });
                    }
                });
                next();
            } else {
                next();
            }
        }
    }
}
exports['@singleton'] = true;
exports['@require'] = ['middleware/errors']