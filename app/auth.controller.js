const { Unauthorized } = require('../common/errors');
const { RESPONSE_MESSAGE, RESPONSE_DESCRIPTION } = require('../common/constant');
// const rp = require('request-promise');
const config = require('../config');
const userService = require('../services/user.service');
const {verifyJwt} = require('../common/jwtUtil');
class AuthController {
    async auth(req, res, next) {
        const { authorization } = req.headers;

        let user_id = verifyJwt(authorization);
        const userQueryJson = {
            where: {
                id: user_id,
            }
        };
        const user = await userService.serviceGetOne(userQueryJson);
        if(!user) {
            return next(Unauthorized(RESPONSE_MESSAGE.USER_DOES_NOT_EXIST, RESPONSE_DESCRIPTION.AUTHENTICATION_FAILED));
        }
        req.headers['user_id'] = user.id;
        return next();
    }
}
module.exports = new AuthController();
