import express from 'express';
import userCtrl from '../controllers/users';

const router = express.Router();

router.route('/')

  /** POST /api/users - Create new user */

  /**
  * @api {post} /v1/users Create new user
  * @apiVersion 0.1.0
  * @apiName PostUser
  * @apiGroup Users
  * @apiPermission none
  *
  * @apiUse CreationUser
  *
  * @apiUse Conflict
  * @apiUse InternalServerError
  **/

  .post(userCtrl.create);


router.route('/:id?')
  .get(userCtrl.list);

export default router;