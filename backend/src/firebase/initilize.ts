import * as admin from 'firebase-admin';
import config from '../config';

export default admin.initializeApp(config.firebase);

declare global {
  namespace Express {
    interface Request {
      firebaseUser: admin.auth.DecodedIdToken;
    }
  }
}
