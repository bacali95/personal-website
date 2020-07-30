import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { FirebaseAuthMiddleware } from './firebase';
import { ApiModule } from './api/api.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [ApiModule, PublicModule],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirebaseAuthMiddleware)
      .forRoutes({ path: 'api/*', method: RequestMethod.ALL });
  }
}
