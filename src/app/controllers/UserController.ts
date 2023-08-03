import { Request, Response } from 'express';
import UserRepository from '../database/repositories/UserRepository';

/** 
 * User Controller
*/


/**
 * Get all Users
 * 
 * @param req Request
 * @param res Response
 * @returns 
 */
function getAllUsers(req: Request, res: Response) {
  const page: number = (req.query.page !== undefined) ? Number(req.query.page) : 1;
  const recordsPerPage: number = (req.query.records_per_page !== undefined) ? Number(req.query.records_per_page) : 10;
  const skip: number = (page - 1) * recordsPerPage;

  UserRepository.getAllUsers({skip: skip, take: recordsPerPage}).then((users) => {
    res.send(users);
  }).catch((error) => {
    res.status(500).json({ status: 'error', message: 'Something went wrong!!!' });
  });
}

function getUser(req: Request, res: Response) {
  const { id } = req.params;
  
  UserRepository.getUserById(id).then((user) => {
    res.send(user);
  }).catch((error) => {
    res.status(500).json({ status: 'error', message: 'Something went wrong!!!' });
  });
}

function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;
  
  UserRepository.getUserById(id).then((user) => {
    if (user) {
      user.name = name;
      user.updatedOn = new Date();
    }
    return user;
  }).then((user) => {
    if (user) {
      UserRepository.saveUser(user).then((userId) => {
        res.send({ status: 'success', message: `User(${userId}) updated successfully.` });
      });
    } else {
      throw new Error('Unable to update the user!!!');
    }
  }).catch((error) => {
    res.status(500).json({ status: 'error', message: 'Something went wrong!!!' });
  });
}

function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  UserRepository.deleteUser(id).then((user) => {
    res.send(user);
  }).catch((error) => {
    res.status(500).json({ status: 'error', message: 'Something went wrong!!!' });
  });
}

// Export the controller functions
export default {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};