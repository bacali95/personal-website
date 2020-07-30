import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { join } from 'path';
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

const server = express();

NestFactory.create<NestExpressApplication>(
  AppModule,
  new ExpressAdapter(server),
).then((app) => {
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');
  app.enableCors();
  app.enableCors();
  app.use(helmet());
  app.init();
});

export const main = functions.https.onRequest(server);
