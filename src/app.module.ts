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
