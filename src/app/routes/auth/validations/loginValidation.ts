import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { getTranslation } from '../../../utils/utils';

export default {
  loginValidation : [
    body('email')
      .notEmpty()
      .withMessage(getTranslation('EMAIL_IS_EMPTY'))
      .isEmail()
      .withMessage(getTranslation('EMAIL_IS_IN_WRONG_FORMAT')),
    body('password')
      .notEmpty()
      .withMessage(getTranslation('PASSWORD_IS_EMPTY')),
    (req: Request, res:Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ]
};