import { TJWTUserData } from '../../types';

declare global {
  namespace Express {
      interface Request {
          user?: TJWTUserData
      }
  }
}
