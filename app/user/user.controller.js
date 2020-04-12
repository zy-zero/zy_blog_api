const userService = require('../../services/user.service');
const { success } = require('../../common/response');
const { BadRequest, Unauthorized, InternalError } = require('../../common/errors');
const db = require('../../common/db');
const { RESPONSE_MESSAGE, RESPONSE_DESCRIPTION } = require('../../common/constant');

const { hash_md5_hex } = require('../../common/encrypt');
// const { generate } = require('randomstring');


// const moment = require('moment');

const { generateJwt } = require('../../common/jwtUtil')

const { Op } = require('sequelize');
class Controller {

    /**
     *  @swagger
     *  /api/v1/user/register:
     *     post:
     *       tags:
     *         - User
     *       description: User register
     *       summary: User register
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   required: true
     *                   type: string
     *                   description: User's email address
     *                 name:
     *                   required: false
     *                   type: string
     *                   description: User's name
     *                 username:
     *                   required: true
     *                   type: string
     *                   description: username
     *                 password:
     *                   required: true
     *                   type: string
     *                   description: User password
     *                 confirm_password:
     *                   required: true
     *                   type: string
     *                   description: User password confirm
     *       responses:
     *         200:
     *           description: success
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   code:
     *                     type: string
     *                     description: convention code of response
     *                   message:
     *                     type:
     *                     description: response message
     *         400:
     *           description: bad request
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: "#/definitions/ErrorResponseModel"
     *         401:
     *           description: authentication fail
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: "#/definitions/ErrorResponseModel"
     *         404:
     *           description: resource not found
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: "#/definitions/ErrorResponseModel"
     *         500:
     *           description: internal error of server
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: "#/definitions/ErrorResponseModel"
     */
    async register(req, res, next) {
        const { name, username, email, password, confirm_password } = req.body;
        let user;
        const t = await db.transaction();
        if(!username){
            return next(BadRequest(RESPONSE_MESSAGE.INVALID_PARAMS, RESPONSE_DESCRIPTION.USERNAME_INVALID));
        }
        if(!email){
            return next(BadRequest(RESPONSE_MESSAGE.INVALID_PARAMS, RESPONSE_DESCRIPTION.EMAIL_INVALID));
        }
        if(!password || !confirm_password) {
            return next(BadRequest(RESPONSE_MESSAGE.INVALID_PARAMS, RESPONSE_DESCRIPTION.PASSWORD_INVALID));
        }
        if(password !== confirm_password){
            return next(BadRequest(RESPONSE_MESSAGE.INVALID_PARAMS, RESPONSE_DESCRIPTION.PASSWORD_CONFIRM_PASSWORD_INVALID));
        }
        const whereJson = {
            where: {
                [Op.or]: [
                    {username: username },
                    {email: email}
                ]
            }
        }
        const isExists = await userService.serviceExists(whereJson);
        if(isExists){
            return next(BadRequest(RESPONSE_MESSAGE.INVALID_PARAMS, RESPONSE_DESCRIPTION.REGISTER_USER_EXIST));
        }
        try {
            const passwordMD5 = hash_md5_hex(password);
            const userModel = {
                name,
                username,
                email,
                password: passwordMD5
            }
            user = await userService.serviceCreateOne(userModel, t);
        } catch (e) {
            t.rollback();
            return next(e);
        }
        t.commit();
        success(res);
    }
    /**
     *  @swagger
     *  /api/v1/user/login:
     *     post:
     *       tags:
     *         - User
     *       description: User login
     *       summary: User login
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 username:
     *                   required: true
     *                   type: string
     *                   description: username
     *                 password:
     *                   required: true
     *                   type: string
     *                   description: User password
     *       responses:
     *         200:
     *           description: success
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   code:
     *                     type: string
     *                     description: convention code of response
     *                   message:
     *                     type:
     *                     description: response message
     *         400:
     *           description: bad request
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: "#/definitions/ErrorResponseModel"
     *         401:
     *           description: authentication fail
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: "#/definitions/ErrorResponseModel"
     *         404:
     *           description: resource not found
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: "#/definitions/ErrorResponseModel"
     *         500:
     *           description: internal error of server
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: "#/definitions/ErrorResponseModel"
     */
    async login(req, res, next) {
        const { username, password} = req.body;
        if(!username){
            return next(BadRequest(RESPONSE_MESSAGE.INVALID_PARAMS, RESPONSE_DESCRIPTION.USERNAME_INVALID));
        }
        if(!password){
            return next(BadRequest(RESPONSE_MESSAGE.INVALID_PARAMS, RESPONSE_DESCRIPTION.PASSWORD_INVALID));
        }
        const passwordMD5 = hash_md5_hex(password);
        const queryJson = {
            where: {
                username: username,
                password: passwordMD5,
            }
        }
        const user = await userService.serviceGetOne(queryJson);
        if(!user){
            return next(BadRequest(RESPONSE_MESSAGE.INVALID_PARAMS, RESPONSE_DESCRIPTION.USERNAME_PASSWORD_ERROR));
        }
        const token = generateJwt(user.id, user.username);
        await userService.serviceUpdate({token}, {where: {id: user.id}});
        const result = {
            token,
            username: user.username
        };
        success(res,result);
    }
}
module.exports = new Controller();
