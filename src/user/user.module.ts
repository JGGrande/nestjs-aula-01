import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CheckIdMiddleware } from 'src/middlewares/CheckId.middleware';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [ AuthModule, FileModule ],
  controllers: [ UserController ],
  providers: [ UserService ]
})
export class UserModule //implements NestModule
{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CheckIdMiddleware).forRoutes({
  //     path: 'users/:id',
  //     method: RequestMethod.ALL
  //   })
  // }
}
