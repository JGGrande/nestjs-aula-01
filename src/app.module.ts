import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from './user/user.module';
import { AuthModule } from "./auth/auth.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entity/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot(), //Habilita as ENV
    ThrottlerModule.forRoot([{ //Rate Limiter
      ttl: 6000,
      limit: 20
    }]),
    UserModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        port: 2525,
        host: "smtp.mailtrap.io",
        auth: {
          user: "70cd8fe5f14237",
          pass: "72ca528453aee3"
        }
      },
      defaults: {
        from: '"Grandão Company" <joao@grandao.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.HOST_DB,
      port: +process.env.PORT_DB,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      entities: [
        User
      ],
      synchronize: process.env.NODE_ENV === "development"
    })
  ],
  controllers: [ AppController ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
