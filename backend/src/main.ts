import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('helmet');
const server = express();

NestFactory.create<NestExpressApplication>(
  AppModule,
  new ExpressAdapter(server),
).then((app) => {
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');
  app.enableCors();
  app.use(helmet({ contentSecurityPolicy: false }));
  app.init().then(() => app.listen(3000));
});
