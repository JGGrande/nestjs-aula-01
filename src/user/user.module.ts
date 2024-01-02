import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/prisma.module';

@Module({
  imports: [ DatabaseModule ],
  controllers: [ UserController ],
  providers: [ UserService ]
})
export class UserModule {}
