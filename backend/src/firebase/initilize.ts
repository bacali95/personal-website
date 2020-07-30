import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as fireorm from 'fireorm';

export default admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
fireorm.initialize(firestore, {
  validateModels: true,
});

declare global {
  namespace Express {
    interface Request {
      firebaseUser: admin.auth.DecodedIdToken;
    }
  }
}
