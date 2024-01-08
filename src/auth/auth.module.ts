import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DatabaseModule } from "src/database/prisma.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    DatabaseModule,
    MailerModule
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
  exports: [ AuthService ]
})
export class AuthModule {}