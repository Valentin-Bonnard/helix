// -----------------------
// Headers
// -----------------------

/**
 * @apiDefine AuthorizationHeader
 *
 * @apiHeader {Object} Authorization header value must follow the pattern
 * "JWT [token sting]"
 *
 * @apiHeaderExample {json} Authorization Header Example:
 *    {
 *      "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
 *    }
 *
 */

 /**
 * @apiDefine CreationUser
 *
 * @apiParam {String} email Users unique email.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess {String} email email of the User.
 * @apiSuccess {String} password  hash password sha512 of the User.
 * @apiSuccess {String} salt  salt of the User ( for decrypt function ) .
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "John@gmail.com",
 *       "password": "fsfqsdfdqsgfqsdef5ds4f5dqs3fd85f......",
 *       "salt": "eeeredds44....",
 *       "_id": "596a19b4f598c3802af2dd8b"
 * 
 *     }
 *
 */

// -----------------------
// Error Responses
// -----------------------

/**
 * @apiDefine NotAuthorizedError
 *
 * @apiError Unauthorized The JWT is missing or not valid.
 *
 * @apiErrorExample Unauthorized Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "status": 401,
 *        "message": "No authorization token was found"
 *     }
 */

/**
 * @apiDefine InternalServerError
 *
 * @apiError InternalError There was an internal error when trying to serve the request
 *
 * @apiErrorExample InternalError Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "status": 500,
 *       "message": "There was an internal error when trying to serve the request"
 *     }
 */

/**
 * @apiDefine Conflict
 *
 * @apiError Conflict There was a conflict
 *
 * @apiErrorExample Conflict Response:
 *     HTTP/1.1 406 Conflict response
 *     {
 *       "status": 406,
 *       "message": "This email is already used"
 *     }
 */

// -----------------------
// Success Responses
// -----------------------

/**
 * @apiDefine NoContentResponse
 * @apiDescription Empty successful response
 *
 * @apiSuccessExample NoContent Response:
 *    HTTP/1.1 204 No Content
 */