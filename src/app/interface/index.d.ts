import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../modules/Auth/auth.models';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
    interface User extends IUser {}
  }
}
