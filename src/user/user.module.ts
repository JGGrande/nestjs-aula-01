import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CheckIdMiddleware } from 'src/middlewares/CheckId.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [
    AuthModule,
    FileModule,
    TypeOrmModule.forFeature([ User ])
  ],
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
