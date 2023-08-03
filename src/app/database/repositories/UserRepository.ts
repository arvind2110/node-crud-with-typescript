import { ObjectId } from 'mongodb';
import { User } from '../../entities/User';
import { DeleteResult } from 'typeorm';
import AppDataSource from '../AppDataSource';

type IGetAllUSers = {
    skip: number,
    take: number
}

const getAllUsers = async (params: IGetAllUSers): Promise<[User[], number] | null> => {
  try {
    const { skip, take } = params;
    console.log(params);
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.findAndCount({
      skip: skip,
      take: take
    });
    return users;
  } catch (error) {
    console.log(error);
    throw new Error('Error Occurred!!!!');
  }
};

const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { _id: new ObjectId(userId) }
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Error Occurred!!!');
  }
};

const getUserBy = async (where: any): Promise<User | null> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy(where);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Error Occurred!!!');
  }
};

const saveUser = async (user: User): Promise<ObjectId> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
    return user._id;
  } catch (error) {
    console.log(error);
    throw new Error('Error Occurred!!!');
  }
};

const deleteUser = async (userId: string): Promise<DeleteResult> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.delete(new ObjectId(userId));
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Error Occurred!!!');
  }
};

export default { 
  getAllUsers,
  getUserById,
  getUserBy,
  saveUser,
  deleteUser
};