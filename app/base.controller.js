class BaseController{

}
module.exports = new BaseController();

/**
 *  @swagger
 * definitions:
 *   ErrorResponseModel:
 *     type: object
 *     description: common error response structure
 *     properties:
 *       code:
 *         type: string
 *         description: convention code of response
 *       message:
 *         type: string
 *         description: response message
 *       description:
 *         type: string
 *         description: detail error message, if any
 *
 *   BlogModel:
 *     type: object
 *     description: tip status overview data
 *     properties:
 *       title:
 *         type: string
 *         description: Unix timestamp of UTC
 *       content:
 *         type: string
 *         description: Tips count or points count
 *       user_id:
 *         type: integer
 *         format: int32
 *         description: user id
 *       create_ts:
 *         type: integer
 *         format: int32
 *         description: time span of craete 
 *       last_ts:
 *         type: integer
 *         format: int32
 *         description: time span of update
 * 
 */



