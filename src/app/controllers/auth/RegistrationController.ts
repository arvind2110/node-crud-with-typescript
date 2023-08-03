import { Request, Response } from 'express';
import { User } from '../../entities/User';
import { generateHashedValue } from '../../utils/utils';
import UserRepository from '../../database/repositories/UserRepository';

/** 
 * Register Controller
*/
async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const hashedPassword = await generateHashedValue(password);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashedPassword;
  user.createdOn = new Date();

  UserRepository.saveUser(user).then(async (userId) => {
    res.status(200).json({ status: 'success', message: `User(${userId}) added successfully.` });
  }).catch((error) => {
    res.status(500).json({ status: 'error', message: 'Something went wrong!!!' });
  });
}

// Export the controller functions
export default {
  register
};