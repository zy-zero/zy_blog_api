const blogService = require('../../services/blog.service');


const { success } = require('../../common/response');
// const { BadRequest, Unauthorized, InternalError } = require('../../common/errors');
const db = require('../../common/db');
// const { RESPONSE_MESSAGE, RESPONSE_DESCRIPTION } = require('../../common/constant');

// const moment = require('moment');

const { Op } = require('sequelize');
class Controller {

    /**
     *  @swagger
     *  /api/v1/blog/create:
     *     post:
     *       security:
     *         - ApiKeyAuth: []
     *       tags:
     *         - Blog
     *       description: create blog
     *       summary: create blog
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 title:
     *                   required: true
     *                   type: string
     *                   description: title
     *                 content:
     *                   required: false
     *                   type: string
     *                   description: title
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
     *                   data:
     *                     $ref: "#/definitions/BlogModel"
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
    async createBlog(req, res, next) {
        const { title, content } = req.body;
        const { user_id } = req.headers;

        const t = await db.transaction();
        let blogCreated;
        const blogModel = {
            title,
            content,
            user_id: user_id
        };
        try {
            blogCreated = await blogService.serviceCreateOne(blogModel, t);
        } catch (e) {
            await t.rollback();
            return next(e);
        }
        await t.commit();

        return success(res);
    }

    /**
     *  @swagger
     *  /api/v1/blog/update:
     *     put:
     *       security:
     *         - ApiKeyAuth: []
     *       tags:
     *         - Blog
     *       description: update blog
     *       summary: update blog
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   required: true
     *                   type: integer
     *                 title:
     *                   required: true
     *                   type: string
     *                   description: title
     *                 content:
     *                   required: false
     *                   type: string
     *                   description: title
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
     *                   data:
     *                     $ref: "#/definitions/BlogModel"
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
    async updateBlog(req, res, next) {
        const { id, title, content } = req.body;
        const { user_id } = req.headers;

        const t = await db.transaction();
        const blogQueryJson = {
            where: {
                id,
            },
            transaction: t
        };

        const blogModel = {
            id,
            title,
            content,
            user_id: user_id
        };
        try {
            await blogService.serviceUpdate(blogModel, blogQueryJson);
        } catch (e) {
            await t.rollback();
            return next(e);
        }
        await t.commit();
        return success(res);
    }
    /**
     *  @swagger
     *  /api/v1/blog:
     *     get:
     *       security:
     *         - ApiKeyAuth: []
     *       tags:
     *         - Blog
     *       description: get user setting info
     *       summary: get user setting info
     *       parameters:
     *         - in: query
     *           name: id
     *           schema:
     *             type: integer
     *           description: the id of blog
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
     *                   data:
     *                     $ref: "#/definitions/BlogModel"
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
    async get(req, res, next) {
        // no uuid in url, from widget url
        const { id } = req.query;
        let blog;
        try {
            const queryJson = {
                where: {
                    id: id
                }
            };
            blog = await blogService.serviceGetOne(queryJson);
        } catch (e) {
            return next(e);
        }
        const result = {
            blog: blog
        };
        success(res, result);
    }
    /**
     *  @swagger
     *  /api/v1/blog/list:
     *     post:
     *       security:
     *         - ApiKeyAuth: []
     *       tags:
     *         - Blog
     *       description: get user setting info
     *       summary: get user setting info
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 title:
     *                   required: true
     *                   type: string
     *                   description: title
     *                 content:
     *                   required: true
     *                   type: string
     *                   description: title
     *                 page:
     *                   required: true
     *                   type: integer
     *                   description: page of list, default 1
     *                 page_size:
     *                   required: true
     *                   type: integer
     *                   description: page size of list, default 10
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
     *                   data:
     *                     $ref: "#/definitions/BlogModel"
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
    async list(req, res, next) {
        const { user_id } = req.headers;
        const { title, content } = req.body;
        let { page, page_size } = req.body;
        page = page ? 1 : page;
        page_size = page_size ? 10 : page_size;
        let blogs;
        try {
            const queryJson = {
                where: {
                    user_id: user_id,
                    title: {
                        [Op.like]: `%${title}%`
                    },
                    content: {
                        [Op.like]: `%${content}%`
                    }
                },
                limit: page_size,
                offset: (page - 1) * page_size
            };
            blogs = await blogService.serviceGetAll(queryJson);
        } catch (e) {
            return next(e);
        }
        const result = {
            list: blogs
        };
        success(res, result);
    }
}
module.exports = new Controller();
