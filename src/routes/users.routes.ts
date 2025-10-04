import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'

const userRouter = Router()

userRouter.post('/login', loginValidator, loginController)
/**
 * Description: Register user
 * Method: POST
 * URL: /user/register
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 string}
 */
userRouter.post('/register', registerValidator, registerController)

export default userRouter
