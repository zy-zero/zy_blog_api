module.exports.RESPONSE_MESSAGE = Object.freeze({
    BAD_REQUEST:"Bad Request",
    ENTITY_NOT_FOUND:"Entity Not Found",
    INVALID_PARAMS:"Invalid Params",
    USER_DOES_NOT_EXIST:"User Does Not Exist",
    DATA_DOES_NOT_EXIST:"Data Does Not Exist",
    MISSING_INITIALIZATION_DATA:"Missing initialization data",
    AUTHENTICATION_FAILED:"Authentication failed",
    FORBIDDEN:"Operation Forbidden"
});
module.exports.RESPONSE_DESCRIPTION = Object.freeze({
    USERNAME_INVALID: "username is invalid.",
    EMAIL_INVALID: "email is invalid",
    PASSWORD_INVALID: "password is invalid",
    PASSWORD_CONFIRM_PASSWORD_INVALID: "password and confirmation password are inconsistent",
    USERNAME_PASSWORD_ERROR: "username or password error.",
    REGISTER_USER_EXIST: "username or email is exsit.",

    AUTHENTICATION_FAILED:"Authentication failed",
    UPLOAD_FAIL:'Upload fail',
    DELETE_FAIL:'Delete fail',
});
module.exports.EXCHANGE = Object.freeze({
    POINT:"POINT",
    GOLD:"GOLD",
    SILVER:"SILVER",
    USD:"USD",
});
module.exports.SUFFIX_CONTENT_TYPE = Object.freeze({
    MAP:{
        '.mp3':'audio/mp3',
        '.gif':'image/gif',
        '.png':'image/png',
        '.jpg':'image/jpeg',
        '.jpeg':'image/jpeg'
    }
});
