import passport, { use } from 'passport';
import passportJWT from 'passport-jwt';
import appConfig from '../configs/app.config';
import { User } from '../entities/User';
import AppDataSource from '../database/AppDataSource';
import { ObjectId } from 'mongodb';
import UserRepository from '../database/repositories/UserRepository';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: appConfig.jwt.secret
};

// Define the JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  const { sub: userId } = payload;

  console.log(userId);
  UserRepository.getUserById(userId).then((user) => {
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }).catch((error) => {
    return done(error, false);
  });
});

passport.use(jwtStrategy);

export default passport;