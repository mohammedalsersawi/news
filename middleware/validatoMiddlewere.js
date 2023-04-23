const {validationResult} = require("express-validator");
const Apierror = require("../ulits/apiErorr");
const validator=(req, res,next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return next(new Apierror(`${errors.msg}`,400)) ;
return  res.status(400).json(errors.array());
    }
    next()
}
module.exports=validator;