import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import { validate } from '~/utils/validation'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  next()
}

export const registerValidator = validate(
  checkSchema({
    name: {
      isString: true,
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage: 'Name must be between 3 and 50 characters'
      },
      notEmpty: true,
      trim: true,
      escape: true
    },
    email: {
      isEmail: true,
      notEmpty: true,
      trim: true,
      custom: {
        options: async (value) => {
          const user = await usersService.checkEmailExist(value)
          if (user) {
            throw new Error('Email already in use')
          }
          return true
        }
      }
    },

    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 6, max: 50 },
        errorMessage: 'Password must be between 6 and 50 characters'
      },
      isStrongPassword: {
        options: { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
        errorMessage: 'Password is not strong enough'
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 6, max: 50 },
        errorMessage: 'Password must be between 6 and 50 characters'
      },
      isStrongPassword: {
        options: { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
        errorMessage: 'Password is not strong enough'
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },
    date_of_birth: {
      optional: true,
      isISO8601: {
        options: { strict: true, strictSeparator: true },
        errorMessage: 'Date of birth must be a valid date'
      },
      toDate: true
    }
  })
)
