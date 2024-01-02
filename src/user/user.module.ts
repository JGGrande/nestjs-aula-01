import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/prisma.module';
import { CheckIdMiddleware } from 'src/middlewares/CheckId.middleware';

@Module({
  imports: [ DatabaseModule ],
  controllers: [ UserController ],
  providers: [ UserService ]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL
    })
  }
}
