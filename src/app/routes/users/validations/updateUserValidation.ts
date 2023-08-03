import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { getTranslation } from '../../../utils/utils';

export default {
  updateUserValition : [
    body('name')
      .notEmpty()
      .withMessage(getTranslation('NAME_IS_EMPTY')),
    (req: Request, res:Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ]
};