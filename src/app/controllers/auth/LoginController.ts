import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { compareHashedValue } from '../../utils/utils';
import appConfig from '../../configs/app.config';
import UserRepository from '../../database/repositories/UserRepository';

/** 
 * Login Controller
*/
async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  UserRepository.getUserBy({email: email}).then(async (user) => {
    if (user) {
      const isValidPassword = await compareHashedValue(password, user.password);
      if (isValidPassword) {
        // Generate a token
        const payload = { sub: user._id };
        const token = jwt.sign(payload, appConfig.jwt.secret, { expiresIn: appConfig.jwt.expiry });
        res.status(200).json({ status: 'success', 'access-token': token });
      }
    } else {
      throw new Error('Something went wrong!!!');
    }    
  }).catch((error) => {
    res.status(500).json({ status: 'error', message: 'Something went wrong!!!' });
  });
}

// Export the controller functions
export default {
  login
};