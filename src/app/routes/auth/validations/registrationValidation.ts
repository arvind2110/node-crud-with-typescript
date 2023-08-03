import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import UserRepository from '../../../database/repositories/UserRepository';
import { getTranslation } from '../../../utils/utils';

export default {
  registrationValidation : [
    body('name')
      .notEmpty()
      .withMessage(getTranslation('NAME_IS_EMPTY')),
    body('email')
      .notEmpty()
      .withMessage(getTranslation('EMAIL_IS_EMPTY'))
      .isEmail()
      .withMessage(getTranslation('EMAIL_IS_IN_WRONG_FORMAT'))
      .custom(async value => {
        const user = await UserRepository.getUserBy({
          email: value
        });

        if (user) {
          throw new Error(getTranslation('USER_EXISTS_ALLREADY'));
        }
      }),
    body('password')
      .notEmpty()
      .withMessage(getTranslation('PASSWORD_IS_EMPTY'))
      .isLength({ min: 8 })
      .withMessage(getTranslation('PASSWORD_LENGTH_MUST_BE_MORE_THAN_8')),
    body('confirm_password')
      .notEmpty()
      .withMessage(getTranslation('CONFIRM_PASSWORD_IS_EMPTY'))
      .isLength({ min: 8 })
      .withMessage(getTranslation('CONFIRM_PASSWORD_LENGTH_MUST_BE_MORE_THAN_8'))
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(getTranslation('PASSWORD_AND_CONFIRM_PASSWORD_MISMATCH'));
        }
        return true;
      }),    
    (req: Request, res:Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ]
};