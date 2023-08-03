import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { getTranslation } from '../../../utils/utils';

export default {
  userIdValidation : [
    param('id')
      .notEmpty()
      .withMessage(getTranslation('ID_IS_EMPTY'))
      .isAlphanumeric()
      .withMessage(getTranslation('INVALID_ID')),
    (req: Request, res:Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ]
};