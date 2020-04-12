module.exports.NotFound = function(message,description){
    Error.call(this);
    this.message = message;
    this.description = description;
    this.status = 404;
    return this;
};
module.exports.BadRequest = function (message,description) {
    Error.call(this);
    this.message = message;
    this.description = description;
    this.status = 400;
    return this;
};
module.exports.Unauthorized = function(message,description){
    Error.call(this);
    this.status = 401;
    this.message = message;
    this.description = description;
    return this;
};
module.exports.Forbidden = function(message,description){
    Error.call(this);
    this.status = 403;
    this.message = message;
    this.description = description;
    return this;
};
module.exports.InternalError = function(message,description){
    Error.call(this);
    this.status = 500;
    this.message = message;
    this.description = description;
    return this;
};
