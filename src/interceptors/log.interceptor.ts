import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

    const dateNow = Date.now();

    return next.handle().pipe(tap(() => {

      const request = context.switchToHttp().getRequest()

      console.log(`URL ${request.url}`);
      console.log(`IP ${request.ip}}`)
      console.log(`Tempo de execução ${Date.now() - dateNow} milesegundos`)

    }));
  }
}