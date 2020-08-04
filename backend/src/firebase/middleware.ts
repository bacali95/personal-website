import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Request, Response } from 'express';
import firebase from './initilize';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: Request, _: Response, next: () => any): Promise<void> {
    const { authorization } = req.headers;
    const token = authorization?.slice(7);

    if (!token) {
      throw new HttpException(
        { message: 'Unauthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    req.firebaseUser = await firebase
      .auth()
      .verifyIdToken(token)
      .catch((error) => {
        throw new HttpException(
          { message: 'Unauthorized', error },
          HttpStatus.UNAUTHORIZED,
        );
      });
    if (req.firebaseUser.email !== 'nasreddine.bacali95@gmail.com') {
      throw new HttpException(
        { message: 'Unauthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    next();
  }
}
