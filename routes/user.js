import { Router } from 'express'
import { check } from 'express-validator'
import * as userCtrl from '../controllers/users.js'
import {
    emailExists,
    existUserById,
    rolIsValid,
} from '../helpers/db-validators.js'
import { validateFIelds } from '../middlewares/validate-fields.js'

const router = Router()

router.get('/', userCtrl.getUsers)

router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check(
            'password',
            'Password is required and min length is a six letters'
        ).isLength({ min: 6 }),
        check('email', 'Email is not valid').isEmail(),
        check('email').custom(emailExists),
        check('rol').custom(rolIsValid),
        validateFIelds,
    ],
    userCtrl.postUsers
)

router.put(
    '/:id',
    [
        check('id', 'Not is valid id').isMongoId(),
        check('id').custom(existUserById),
        check('rol').custom(rolIsValid),
        validateFIelds,
    ],
    userCtrl.putUsers
)

router.delete(
    '/:id',
    [
        check('id', 'Not is valid id').isMongoId(),
        check('id').custom(existUserById),
        validateFIelds,
    ],
    userCtrl.deleteUsers
)

export default router
