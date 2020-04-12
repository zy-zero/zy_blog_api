const {fail} = require('./response');
class GeneralErrorHandler {
    errorHandler(err, req, res, next){
        fail(res,err.status==null?500:err.status,err.message,err.description);
    };
}

module.exports= new GeneralErrorHandler();
