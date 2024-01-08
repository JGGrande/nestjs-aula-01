import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Request } from "express";

import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService){ }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest() as Request

    const { authorization } = request.headers;

    if(!authorization){
      throw new ForbiddenException("Token not sended");
    }

    const [ , token] = authorization.split(" ");

    try {
      const data = this.authService.verifyToken(token);
      request.user = {
        id: +data.id,
        role: data.role
      };
      return true
    }catch(e){
      console.error(e);
      return false;
    }

  }
}