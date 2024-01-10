import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { User } from "../user/entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
    }),
    MailerModule,
    TypeOrmModule.forFeature([ User ])
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
  exports: [ AuthService ]
})
export class AuthModule {}