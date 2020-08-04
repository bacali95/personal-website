import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseAuthMiddleware } from './firebase';
import { ApiModule } from './api/api.module';
import { PublicModule } from './public/public.module';
import config from './config';

@Module({
  imports: [
    ApiModule,
    PublicModule,
    MongooseModule.forRoot(config.mongoose.uri, { useNewUrlParser: true }),
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirebaseAuthMiddleware)
      .forRoutes({ path: 'api/*', method: RequestMethod.ALL });
  }
}
